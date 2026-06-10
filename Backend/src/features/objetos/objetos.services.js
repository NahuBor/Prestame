const ObjetosdelRepository = require('objetos.repository')

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