const Objeto = require('../../shared/models/objeto.model.js')


const EMPTY_ARRAY = []
// CREATE
exports.crearObjetoRepository = async (datosObjeto) => {
    try {
        console.log("REPOSITORY - crearObjeto", datosObjeto)
        const objeto = new Objeto(datosObjeto)
        return await objeto.save()
    } catch (error) {
        console.log("Error en crearObjetoRepository", error)
    }
}

//UPDATE
exports.editarObjetoRepository = async (id, objetoActualizado) => {
    try {
        console.log("REPOSITORY - editarObjetoRepository - id:", id, "- objetoActualizado:", objetoActualizado)
        const objetoEditado = await Objeto.findByIdAndUpdate(id, objetoActualizado, { new: true })
        if (!objetoEditado) {
            console.log("objeto no encontrado")
            return EMPTY_ARRAY
        } else {
            console.log("objeto editado:", objetoEditado)
            return objetoEditado
        }
    } catch (error) {
        console.log("Error en editarObjetoRepository", error)
    }
}

//DELETE
exports.eliminarObjetoRepository = async (id) => {
    try {
        console.log("REPOSITORY - eliminarObjetoRepository - id:", id)
        const objetoEliminado = await Objeto.findByIdAndDelete(id)
        if (!objetoEliminado) {
            console.log("objeto no encontrado")
            return EMPTY_ARRAY
        } else {
            console.log("objeto eliminado:", objetoEliminado)
            return objetoEliminado
        }
    } catch (error) {
         console.log("Error en eliminarObjetoRepository", error)
    }
}
