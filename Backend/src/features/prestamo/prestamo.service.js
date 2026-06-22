const prestamoRepository = require('./prestamo.repository')
const objetoRepository = require('../objetos/objeto.Repository')
const EMPTY_ARRAY = []

exports.getAllPrestamosService = async () => {
    try {
        const prestamos = await prestamoRepository.getAllprestamosRepository()
        return prestamos || EMPTY_ARRAY
    } catch (error) {
        console.log("Error en getAllPrestamosService", error)
        return EMPTY_ARRAY
    }
}

exports.createPrestamoService = async (datosPrestamo) => {
    try {
        console.log("SERVICE - createPrestamoService", datosPrestamo)
        const { objetoId, solicitanteId, tiempo_del_prestamo } = datosPrestamo

        const objeto = await objetoRepository.getObjetsByIdRepository(objetoId)
        if (!objeto) {
            return { error: true, message: "El objeto no existe", status: 404 }
        }
        if (objeto.estado !== 'disponible') {
            return { error: true, message: "El objeto no está disponible", status: 400 }
        }
        if (String(objeto.duenioId).trim() === String(solicitanteId).trim()) {
            return { error: true, message: "No puedes solicitar tu propio objeto", status: 400 }
        }

        const objetosDelSolicitante = await objetoRepository.getObjectsByDuenioIdRepository(solicitanteId)
        if (!objetosDelSolicitante || objetosDelSolicitante.length === 0) {
            return { error: true, message: "Para solicitar un préstamo debes tener al menos un objeto publicado", status: 400 }
        }

        const nuevoPrestamo = {
            objetoId,
            duenioId: objeto.duenioId,
            solicitanteId,
            estado: 'pendiente',
            tiempo_del_prestamo,
            fechaCreacion: new Date()
        }
        console.log("📦 Creando préstamo con duenioId:", nuevoPrestamo.duenioId)
        console.log("📦 solicitanteId:", nuevoPrestamo.solicitanteId)

        const prestamoCreado = await prestamoRepository.crearPrestamoRepository(nuevoPrestamo)
        if (!prestamoCreado) {
            return { error: true, message: "No se pudo crear la solicitud", status: 500 }
        }
        return prestamoCreado
    } catch (error) {
        console.log("Error en createPrestamoService", error)
        return { error: true, message: "Error interno del servidor", status: 500 }
    }
}

exports.getPrestamosByDuenioService = async (duenioId) => {
    try {
        console.log("SERVICE - getPrestamosByDuenioService, ID:", duenioId)
        return await prestamoRepository.getPrestamosByDuenioRepository(duenioId)
    } catch (error) {
        console.log("Error getPrestamosByDuenioService", error)
        return EMPTY_ARRAY
    }
}

exports.getPrestamosBySolicitanteService = async (solicitanteId) => {
    try {
        console.log("SERVICE - getPrestamosBySolicitanteService, ID:", solicitanteId)
        return await prestamoRepository.getPrestamosBySolicitanteRepository(solicitanteId)
    } catch (error) {
        console.log("Error getPrestamosBySolicitanteService", error)
        return EMPTY_ARRAY
    }
}

exports.getPrestamoByIdService = async (prestamoId) => {
    try {
        return await prestamoRepository.getPrestamoByIdRepository(prestamoId)
    } catch (error) {
        console.log("Error getPrestamoByIdService", error)
        return null
    }
}

exports.updateEstadoPrestamoService = async (prestamoId, nuevoEstado, usuarioId) => {
    try {
        console.log("🔍 UPDATE - prestamoId:", prestamoId)
        console.log("🔍 UPDATE - usuarioId recibido:", usuarioId)

        // ✅ Extraer el ID real si usuarioId es un objeto
        let usuarioIdReal = null;
        if (usuarioId && typeof usuarioId === 'object') {
            // Si es objeto, tomar _id o id
            usuarioIdReal = usuarioId._id || usuarioId.id || null;
            console.log("🔍 UPDATE - usuarioId es objeto, extrayendo _id:", usuarioIdReal);
        } else if (typeof usuarioId === 'string') {
            usuarioIdReal = usuarioId;
        } else if (typeof usuarioId === 'number') {
            usuarioIdReal = String(usuarioId);
        } else {
            usuarioIdReal = null;
        }

        if (!usuarioIdReal) {
            console.log("❌ No se pudo obtener el ID real del usuario");
            return { error: true, message: 'Usuario no identificado', status: 400 };
        }

        // Convertir a string y trim
        const usuarioIdStr = String(usuarioIdReal).trim();
        console.log("🔍 UPDATE - usuarioIdReal (string):", usuarioIdStr);

        const prestamo = await prestamoRepository.getPrestamoByIdRepository(prestamoId)
        if (!prestamo) {
            console.log("❌ Préstamo no encontrado")
            return { error: true, message: 'Préstamo no encontrado', status: 404 }
        }

        console.log("🔍 UPDATE - préstamo completo:", prestamo)
        console.log("🔍 UPDATE - duenioId guardado:", prestamo.duenioId)
        const duenioStr = String(prestamo.duenioId).trim()
        console.log("🔍 UPDATE - duenioStr:", duenioStr)

        console.log("🔍 Comparando: duenioStr =", duenioStr, "usuarioStr =", usuarioIdStr)

        // ⚠️ Si quieres desactivar temporalmente la validación (para pruebas), descomenta la siguiente línea:
        // return await prestamoRepository.updateEstadoPrestamoRepository(prestamoId, nuevoEstado);

        if (duenioStr !== usuarioIdStr) {
            console.log("❌ No coinciden: duenioId=", duenioStr, "usuarioId=", usuarioIdStr)
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
        console.log("Error en updateEstadoPrestamoService", error)
        return { error: true, message: 'Error interno del servidor', status: 500 }
    }
}