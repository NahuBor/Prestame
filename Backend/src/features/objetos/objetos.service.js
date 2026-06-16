const ObjetosdelRepository = require('./objetos.repository')

exports.getAllObjets = async () => {
    try {
        console.log("SERVICE - ObjetosdelRepository")
        let testDatos = await ObjetosdelRepository.getAllobjetsRepository()
        console.log(testDatos)
        return testDatos
    } catch (error) {
        console.log("Error en getAllobjetsRepository()", error)//borrar el error
    }

}

exports.getObjetsfilteredByIdService = async (id) => {
    try {
        console.log("SERVICE - getObjetsfilteredById")
        let testDatos = await ObjetosdelRepository.getObjetsByIdRepository(id)
        console.log(testDatos)
        return testDatos
    } catch (error) {
        console.log("Error en getObjetsfilteredById", error)
    }
}

exports.getObjetsfilteredByDuenioIdService = async (id) => {
    try {
        console.log("SERVICE - getObjetsfilteredByDuenioIdService")
        let testDatos = await ObjetosdelRepository.getObjectsByDuenioIdRepository(id)
        console.log(testDatos)
        return testDatos
    } catch (error) {
        console.log("Error en getObjetsfilteredByDuenioIdService", error)
    }
}