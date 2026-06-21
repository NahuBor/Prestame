const prestamoRepository = require('./prestamo.repository')
const usuarioRepository = require('../auth/authRepository')
const objetoRepository = require('../objetos/objeto.Repository')

const EMPTY_ARRAY = []

exports.getAllPrestamosService = async () => {
    try {
        console.log("SERVICE - getAllPrestamosService")
        let testDatos = await prestamoRepository.getAllprestamosRepository()
        console.log(testDatos)
        return testDatos || EMPTY_ARRAY
    } catch (error) {
        console.log("Error en getAllobjetsRepository()", error)//borrar el error
        return EMPTY_ARRAY
    }

}

exports.createPrestamoService = async (datosPrestamo) => {
    try {
        console.log("SERVICE - createPrestamoService", datosPrestamo)
  
        const objetos_solicitante= await objetoRepository.getObjectsByDuenioIdRepository(datosPrestamo.duenioId)


        if(objetos_solicitante.length===0){
            return {menssage:"Para solicitar un prestamo debes tener al menos un objeto para prestar"}
        }
        return await prestamoRepository.crearPrestamoRepository(datosPrestamo)
    } catch (error) {
        console.log("Error en cretePrestamoService", error)
        return null
    }
}