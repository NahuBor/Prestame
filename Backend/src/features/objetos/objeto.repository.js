const Objeto = require('../../models/objeto.model')


// CREATE
exports.crearObjetoRepository = async (datosObjeto) => {
    try {
        console.log("REPOSITORY - crearObjeto", datosObjeto)
        const objeto = new Objeto(datosObjeto)
        return await objeto.save()
    } catch (error) {
        throw error
    }
}

//UPDATE
exports.editarObjetoRepository = async (id, objetoActualizado) => {
    try {
        console.log("REPOSITORY - editarObjetoRepository - id:", id, "- objetoActualizado:", objetoActualizado)
        return await Objeto.findByIdAndUpdate(id, objetoActualizado, { new: true })
    } catch (error) {
        throw error
    }
}

//DELETE
exports.eliminarObjetoRepository = async (id) => {
    try {
        console.log("REPOSITORY - eliminarObjetoRepository - id:", id)
        return await Objeto.findByIdAndDelete(id)
    } catch (error) {
        throw error
    }
}
