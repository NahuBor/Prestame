const objetoRepository = require('./objeto.repository')

// service
exports.crearObjetoService = async (datosObjeto) => {
    try {
        console.log("SERVICE - crearObjetoService", datosObjeto)
        return await objetoRepository.crearObjetoRepository(datosObjeto)
    } catch (error) {
        throw error
    }
}