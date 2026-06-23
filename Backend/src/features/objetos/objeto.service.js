const objetoRepository = require('./objeto.repository')

const EMPTY_ARRAY = []

exports.crearObjetoService = async (datosObjeto) => {
    try {
        return await objetoRepository.crearObjetoRepository(datosObjeto)
    } catch (error) {
        console.log("Error en crearObjetoRepository")
       return { error: true, message: 'Error interno', status: 500 };
    }
}

exports.editarObjetoService = async (id, objetoActualizado) => {
    try {
        const objeto = await objetoRepository.editarObjetoRepository(id, objetoActualizado)
        if (!objeto || objeto.length === 0) {
            console.log("objeto no encontrado")
           return { error: true, message: 'Error interno', status: 500 };
        }
        return objeto
    } catch (error) {
        console.log("Error en crearObjetoRepository")
        return { error: true, message: 'Error interno', status: 500 };
    }
}

exports.eliminarObjetoService = async (idObjeto) => {
    try {
        const objetoEliminado = await objetoRepository.eliminarObjetoRepository(idObjeto)
        if (!objetoEliminado || objetoEliminado.length === 0) {
            console.log("objeto no encontrado")
            return EMPTY_ARRAY
        }
        return objetoEliminado
    }
    catch (error) {
        console.log("Error en eliminarObjetoRepository")
        return { error: true, message: 'Error interno', status: 500 };
    }
}

exports.getAllObjets = async () => {
    try {
        let testDatos = await objetoRepository.getAllobjetsRepository()
        return testDatos || EMPTY_ARRAY
    } catch (error) {
        console.log("Error en getAllobjetsRepository()")
        return { error: true, message: 'Error interno', status: 500 };
    }

}

exports.getObjetsfilteredByIdService = async (id) => {
    try {
        let testDatos = await objetoRepository.getObjetsByIdRepository(id)
        return testDatos
    } catch (error) {
        console.log("Error en getObjetsfilteredById")
        return  { error: true, message: 'Error interno', status: 500 };
    }
}

exports.getObjetsfilteredByDuenioIdService = async (id) => {
    try {
        let testDatos = await objetoRepository.getObjectsByDuenioIdRepository(id)
        return testDatos
    } catch (error) {
        console.log("Error en getObjetsfilteredByDuenioIdService")
        return  { error: true, message: 'Error interno', status: 500 };
    }
}

exports.getObjetsfilteredByCategoriaService = async (categoria) => {
    try {
        const objetos = await objetoRepository.getObjetsfilteredByCategoriaRepository(categoria);
        return objetos || EMPTY_ARRAY;
    } catch (error) {
        console.log(`Error en getObjetsfilteredByCategoriaService:`);
        return { error: true, message: 'Error interno', status: 500 };
    }
}