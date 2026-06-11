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