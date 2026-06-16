const ObjetosService = require('./objetos.service')

exports.readObjets = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)
        res.send(await ObjetosService.getAllObjets())
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
    
    const filtrado = await ObjetosService.getObjetsfilteredByIdService(idParam)

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
    
    const filtrado = await ObjetosService.getObjetsfilteredByDuenioIdService(duenioIdParam)

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el objeto con el id: ${duenioIdParam}`)
        console.log("Saliendo del if")
    }

    res.setHeader('Content-Type', 'application/json')
    let filtradoJson = JSON.stringify(filtrado)
    
    return res.status(200).send(filtradoJson)

}
