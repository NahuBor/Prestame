const objetoRepository = require('./objeto.repository')

// crear Objeto Service
exports.crearObjetoService = async (datosObjeto) => {
    try {
        console.log("SERVICE - crearObjetoService", datosObjeto)
        return await objetoRepository.crearObjetoRepository(datosObjeto)
    } catch (error) {
        throw error
    }
}

// editar Obejto Service
exports.editarObjetoService = async (id, objetoActualizado) => {
    try {
        console.log("SERVICE - editarObjetoService", id, objetoActualizado)
        const objeto = await objetoRepository.editarObjetoRepository(id, objetoActualizado)
        if (!objeto) {
            throw new Error("Objeto no encontrado")
        }
        return objeto
    } catch (error) {
        throw error
    }
}