const objetoService = require('./objeto.service')

exports.crearObjetoController = async (req, res) => {
    try {
        const nuevoObjeto = {
            ...req.body,
            duenioId: /*req.session.userId,*/'6a2b1de016a755a64aed94c1',
            estado: 'disponible'
        }
        console.log("CONTROLLER - crearObjetoController - ", typeof nuevoObjeto, nuevoObjeto)
        const objeto = await objetoService.crearObjetoService(nuevoObjeto)
        if (!objeto || objeto.length === 0) {
            return res.status(400).send("No se pudo crear el objeto")
        }
        res.status(200).send(objeto)
    } catch (error) {
        console.log("Error - CONTROLLER crearObjeto", error)
        res.status(500).send({ code: 500, message: "Error al agregar el nuevo Objeto" })
    }
}

exports.editarObjetoController = async (req, res) => {
    try {
        const id = req.params.id
        const objetoActualizado = req.body
        console.log("CONTROLLER - editarObjetoController - ", typeof objetoActualizado, objetoActualizado)
        const objeto = await objetoService.editarObjetoService(id, objetoActualizado)
        if (!objeto || objeto.length === 0) {
            return res.status(404).send(`No se encuentra un objeto a modificar con el id: ${id}`)
        }
        res.status(200).send(objeto)
    } catch (error) {
        console.log("Error - CONTROLLER editarObjeto", error)
        res.status(500).send({ code: 500, message: "Error al editar el objeto" })
    }
}

exports.eliminarObjetoController = async (req, res) => {
    try {
        const idObjeto = req.params.id
        console.log("CONTROLLER - eliminarObjetoController - idObjeto:", idObjeto)
        const objeto = await objetoService.eliminarObjetoService(idObjeto)
        if (!objeto || objeto.length === 0) {
            return res.status(404).send(`No se encuentra un objeto a eliminar con el id: ${id}`)
        }
        res.status(200).send({ code: 200, message: "Objeto eliminado correctamente" })
    } catch (error) {
        console.log("Error - CONTROLLER eliminarObjeto", error)
        res.status(500).send({ code: 500, message: "Error al eliminar el objeto" })
    }
}



exports.readObjets = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await objetoService.getAllObjets())
    } catch (error) {
        console.log("Error readObjetsLanguages", error)
        res.status(500).send({
            code: 500,
            message: "Error al obtener los lenguajes frontend"
        })
    }
}

exports.readObjetsByIdcontroller = async (req, res) => {
    const idParam = req.params.id;
    
    const filtrado = await objetoService.getObjetsfilteredByIdService(idParam)

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el objeto con el id: ${idParam}`)
        console.log("Saliendo del if")
    }

    res.setHeader('Content-Type', 'application/json')
    let filtradoJson = JSON.stringify(filtrado)
    
    return res.status(200).send(filtradoJson)

}

exports.readObjetsByDuienioIdcontroller = async (req, res) => {
    const duenioIdParam = req.params.duenioId;
    
    const filtrado = await objetoService.getObjetsfilteredByDuenioIdService(duenioIdParam)

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el objeto con el id: ${duenioIdParam}`)
        console.log("Saliendo del if")
    }

    res.setHeader('Content-Type', 'application/json')
    let filtradoJson = JSON.stringify(filtrado)
    
    return res.status(200).send(filtradoJson)

}
