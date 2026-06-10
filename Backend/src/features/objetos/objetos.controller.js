const ObjetosService = require('objetos.services')

exports.readObjetsLanguages = async (req, res) => {
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
