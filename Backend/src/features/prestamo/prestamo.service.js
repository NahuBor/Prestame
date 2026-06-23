const prestamoRepository = require('./prestamo.repository')
const objetoRepository = require('../objetos/objeto.repository')
const EMPTY_ARRAY = []

exports.getAllPrestamosService = async () => {
    try {
        const prestamos = await prestamoRepository.getAllprestamosRepository()
        return prestamos || EMPTY_ARRAY
    } catch (error) {
        console.log("Error en getAllPrestamosService");
        return { error: true, message: 'Error interno', status: 500 }; 
    }
}

exports.createPrestamoService = async (datosPrestamo) => {
    try {
        const { objetoId, solicitanteId, tiempo_del_prestamo } = datosPrestamo
        const objeto = await objetoRepository.getObjetsByIdRepository(objetoId)
        if (!objeto) {
            return { error: true, message: "El objeto no existe", status: 404 }
        }
        if (objeto.estado !== 'disponible') {
            return { error: true, message: "El objeto no está disponible", status: 400 }
        }
        const duenioIdStr = typeof objeto.duenioId === 'object' 
    ? String(objeto.duenioId._id || objeto.duenioId) 
    : String(objeto.duenioId);
        if  (duenioIdStr.trim() === String(solicitanteId).trim()) {
            return { error: true, message: "No puedes solicitar tu propio objeto", status: 400 }
        }

        const objetosDelSolicitante = await objetoRepository.getObjectsByDuenioIdRepository(solicitanteId)
        if (!objetosDelSolicitante || objetosDelSolicitante.length === 0) {
            return { error: true, message: "Para solicitar un préstamo debes tener al menos un objeto publicado", status: 400 }
        }

        const nuevoPrestamo = {
            objetoId,
            duenioId: typeof objeto.duenioId === 'object' 
    ? objeto.duenioId._id || objeto.duenioId 
    : objeto.duenioId,
            solicitanteId,
            estado: 'pendiente',
            tiempo_del_prestamo,
            fechaCreacion: new Date()
        }
        const prestamoCreado = await prestamoRepository.crearPrestamoRepository(nuevoPrestamo)
        if (!prestamoCreado) {
            return { error: true, message: "No se pudo crear la solicitud", status: 500 }
        }
        return prestamoCreado
    } catch (error) {
        console.log("Error en createPrestamoService");
        return { error: true, message: "Error interno del servidor", status: 500 }
    }
}

exports.getPrestamosByDuenioService = async (duenioId) => {
    try {
        return await prestamoRepository.getPrestamosByDuenioRepository(duenioId)
    } catch (error) {
        console.log("Error getPrestamosByDuenioService");
        return { error: true, message: 'Error interno', status: 500 }; 
    }
    
}

exports.getPrestamosBySolicitanteService = async (solicitanteId) => {
    try {
        return await prestamoRepository.getPrestamosBySolicitanteRepository(solicitanteId)
    } catch (error) {
        console.log("Error getPrestamosBySolicitanteService");
        return { error: true, message: 'Error interno', status: 500 }; 
    }
}

exports.getPrestamoByIdService = async (prestamoId) => {
    try {
        return await prestamoRepository.getPrestamoByIdRepository(prestamoId)
    } catch (error) {
        console.log("Error getPrestamoByIdService");
        return null
    }
}

exports.updateEstadoPrestamoService = async (prestamoId, nuevoEstado, usuarioId) => {
    try {

        let usuarioIdReal = null;
        if (usuarioId && typeof usuarioId === 'object') {
            usuarioIdReal = usuarioId._id || usuarioId.id || null;
        } else if (typeof usuarioId === 'string') {
            usuarioIdReal = usuarioId;
        } else if (typeof usuarioId === 'number') {
            usuarioIdReal = String(usuarioId);
        } else {
            usuarioIdReal = null;
        }
        if (!usuarioIdReal) {
            return { error: true, message: 'Usuario no identificado', status: 400 };
        }
        const usuarioIdStr = String(usuarioIdReal).trim();
        const prestamo = await prestamoRepository.getPrestamoByIdRepository(prestamoId)
        if (!prestamo) {
            return { error: true, message: 'Préstamo no encontrado', status: 404 }
        }
        const duenioStr = String(prestamo.duenioId._id).trim()
        if (duenioStr !== usuarioIdStr) {
            return { error: true, message: 'No tienes permiso para modificar este préstamo', status: 403 }
        }
        if (prestamo.estado !== 'pendiente') {
            return { error: true, message: 'El préstamo ya fue procesado', status: 400 }
        }
        if (nuevoEstado === 'aceptado') {
            const objeto = await objetoRepository.getObjetsByIdRepository(prestamo.objetoId)
            if (!objeto || objeto.estado !== 'disponible') {
                return { error: true, message: 'El objeto ya no está disponible', status: 400 }
            }
            await objetoRepository.updateEstadoObjetoRepository(prestamo.objetoId, 'prestado')
        }

        const prestamoActualizado = await prestamoRepository.updateEstadoPrestamoRepository(prestamoId, nuevoEstado)
        return prestamoActualizado
    } catch (error) {
        console.log("Error en updateEstadoPrestamoService");
        return { error: true, message: 'Error interno del servidor', status: 500 }
    }
}


exports.solicitarDevolucionService = async (prestamoId, usuarioId) => {
  try {
    let usuarioIdStr = usuarioId;
    if (usuarioId && typeof usuarioId === 'object') {
        usuarioIdStr = usuarioId._id || usuarioId.id || String(usuarioId);
    } else if (usuarioId) {
        usuarioIdStr = String(usuarioId);
    } else {
        return { error: true, message: 'Usuario no identificado', status: 400 };
    }
    const prestamo = await prestamoRepository.getPrestamoByIdRepository(prestamoId);
    if (!prestamo) {
      return { error: true, message: 'Préstamo no encontrado', status: 404 };
    }

    const solicitanteIdStr = String(prestamo.solicitanteId?._id || '');
    console.log('solicitanteIdStr:', solicitanteIdStr);
    console.log('Comparando:', solicitanteIdStr, '===', usuarioIdStr);
    if (solicitanteIdStr !== usuarioIdStr) {
    return { error: true, message: 'Solo el solicitante puede devolver el objeto', status: 403 };
    }
    if (prestamo.estado !== 'aceptado') {
      return { error: true, message: 'Solo se pueden devolver préstamos activos', status: 400 };
    }
    const resultado = await prestamoRepository.updateEstadoPrestamoRepository(prestamoId, 'pendiente_devolucion');
    return resultado;
  } catch (error) {
    console.log("Error en solicitarDevolucionService", error);
    return { error: true, message: 'Error interno del servidor', status: 500 };
  }
};


exports.confirmarDevolucionService = async (prestamoId, usuarioId) => {
  try {
    let usuarioIdStr = usuarioId;
    if (usuarioId && typeof usuarioId === 'object') {
      usuarioIdStr = usuarioId._id || usuarioId.id || String(usuarioId);
    } else if (usuarioId) {
      usuarioIdStr = String(usuarioId);
    } else {
      return { error: true, message: 'Usuario no identificado', status: 400 };
    }
    const prestamo = await prestamoRepository.getPrestamoByIdRepository(prestamoId);
    if (!prestamo) {
      return { error: true, message: 'Préstamo no encontrado', status: 404 };
    }

    const duenioIdStr = String(prestamo.duenioId?._id || '');
    if (duenioIdStr !== usuarioIdStr) {
      return { error: true, message: 'Solo el dueño puede confirmar la devolución', status: 403 };
    }

    if (prestamo.estado !== 'pendiente_devolucion') {
      return { error: true, message: 'No hay una devolución pendiente de confirmar', status: 400 };
    }

    await objetoRepository.updateEstadoObjetoRepository(prestamo.objetoId, 'disponible');
    const resultado = await prestamoRepository.updateEstadoPrestamoRepository(prestamoId, 'devuelto');
    return resultado;
  } catch (error) {
    console.log("Error en confirmarDevolucionService", error);
    return { error: true, message: 'Error interno del servidor', status: 500 };
  }
};