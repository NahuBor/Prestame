const objetoService = require('./objeto.service')

exports.crearObjetoController = async (req, res) => {
    try {
        const nuevoObjeto = {
            ...req.body,
            duenioId: req.session.userId,
            estado: 'disponible'
        }
        console.log("CONTROLLER - crearObjetoController - ", typeof nuevoObjeto, nuevoObjeto)
        res.send(await objetoService.crearObjetoService(nuevoObjeto))
    } catch (error) {
        console.log("Error - CONTROLLER crearObejto", error)
        res.status(500).send({
            code: 500,
            message: "Error al agregar el nuevo Objeto"
        })
    }
}

exports.editarObjetoController = async (req, res) => {
    try {
        const id = req.params.id
        const objetoActualizado = req.body
        console.log("CONTROLLER - editarObjetoController - ", typeof objetoActualizado, objetoActualizado)
        res.send(await objetoService.editarObjetoService(id, objetoActualizado))

    } catch (error) {
        console.log("Error - CONTROLLER editarObjeto", error)
        res.status(500).send({
            code: 500,
            message: "Error al editar el objeto"
        })

    }
}

exports.eliminarObjetoController = async (req, res) => {
    try {
        const idObjeto = req.params.id
        console.log("CONTROLLER - eliminarObjetoController - idObjeto:", idObjeto)
        await objetoService.eliminarObjetoService(idObjeto)
        res.send({
            code: 200,
            message: "Objeto eliminado correctamente"
        })
    } catch(error){
        console.log("Error - CONTROLLER eliminarObjeto", error)
        res.status(500).send({
            code: 500,
            message: "Error al eliminar el objeto"
        })
    }
}