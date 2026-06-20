const objetoRepository = require('./objeto.repository')

const EMPTY_ARRAY = []
// crear Objeto Service
exports.crearObjetoService = async (datosObjeto) => {
    try {
        console.log("SERVICE - crearObjetoService", datosObjeto)
        return await objetoRepository.crearObjetoRepository(datosObjeto)
    } catch (error) {
        console.log("Error en crearObjetoRepository", error)
    }
}

// editar Obejto Service
exports.editarObjetoService = async (id, objetoActualizado) => {
    try {
        console.log("SERVICE - editarObjetoService", id, objetoActualizado)
       const objeto = await objetoRepository.editarObjetoRepository(id, objetoActualizado)
        if (!objeto || objeto.length === 0) {
            console.log("objeto no encontrado")
            return EMPTY_ARRAY
        }
        return objeto
    } catch (error) {
        console.log("Error en crearObjetoRepository", error)
    }
}

// eliminar Objeto Service

exports.eliminarObjetoService = async (idObjeto) => {
    try {
        console.log("SERVICE - eliminarObjetoService", idObjeto)
         const objetoEliminado = await objetoRepository.eliminarObjetoRepository(idObjeto)
        if (!objetoEliminado || objetoEliminado.length === 0) {
            console.log("objeto no encontrado")
            return EMPTY_ARRAY
        }
        return objetoEliminado
    }
    catch (error) {
       console.log("Error en eliminarObjetoRepository", error)
    }
}


exports.getAllObjets = async () => {
    try {
        console.log("SERVICE - ObjetosdelRepository")
        let testDatos = await objetoRepository.getAllobjetsRepository()
        console.log(testDatos)
        return testDatos || EMPTY_ARRAY
    } catch (error) {
        console.log("Error en getAllobjetsRepository()", error)//borrar el error
        return EMPTY_ARRAY
    }

}

exports.getObjetsfilteredByIdService = async (id) => {
    try {
        console.log("SERVICE - getObjetsfilteredById")
        let testDatos = await objetoRepository.getObjetsByIdRepository(id)
        console.log(testDatos)
        return testDatos
    } catch (error) {
        console.log("Error en getObjetsfilteredById", error)
    }
}

exports.getObjetsfilteredByDuenioIdService = async (id) => {
    try {
        console.log("SERVICE - getObjetsfilteredByDuenioIdService")
        let testDatos = await objetoRepository.getObjectsByDuenioIdRepository(id)
        console.log(testDatos)
        return testDatos
    } catch (error) {
        console.log("Error en getObjetsfilteredByDuenioIdService", error)
    }
}

exports.getObjetsfilteredByCategoriaService = async (categoria) => {
    try {
        console.log(`SERVICE - getObjetsfilteredByCategoriaService: ${categoria}`);
        const objetos = await objetoRepository.getObjetsfilteredByCategoriaRepository(categoria);
        console.log(`Service recibió ${objetos?.length || 0} objetos de categoría: ${categoria}`);
        return objetos || EMPTY_ARRAY;
    } catch (error) {
        console.log(`Error en getObjetsfilteredByCategoriaService:`, error);
        return EMPTY_ARRAY;
    }
}