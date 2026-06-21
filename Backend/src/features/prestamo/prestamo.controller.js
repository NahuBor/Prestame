const { log } = require('node:console')
const prestamoService = require('./prestamo.service')

exports.readPrestamosController  = async (req, res) => {
    try {
        const prestamos = await prestamoService.getAllPrestamosService()

        if (prestamos.length === 0) {
            return res.status(404).send('No se encontraron objetos')
        }



        res.setHeader('Content-Type', 'application/json')
        return res.status(200).send(prestamos)
    } catch (error) {
        console.log("Error readObjets", error)
        res.status(500).send({
            code: 500,
            message: "Error al obtener los prestamos"
        })
    }
}



exports.createPrestamoController = async (req, res) => {
    try {
        const nuevoPrestamo = {
            ...req.body,
            duenioId: req.session.userId,
            estado: 'pendiente'
   
        }
   


        console.log("CONTROLLER - crearPrestamoController - ", typeof nuevoPrestamo, nuevoPrestamo)

        const prestamo = await prestamoService.createPrestamoService(nuevoPrestamo)
        
        if (prestamo === null) {
            return res.status(400).send({
                code: 400,
                message: "No se pudo crear el prestamo. Verifique los datos."
            })
        }
        if (!prestamo || prestamo.length === 0) {
            return res.status(400).send({
                code: 400,
                message: "No se pudo crear el prestamo"
            })
        }
        res.status(200).send(prestamo)
    } catch (error) {
        console.log("Error - CONTROLLER createPrestamo", error)
        res.status(500).send({
            code: 500,
            message: "Error al agregar el nuevo Prestamo"
        })
    }
}