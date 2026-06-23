const prestamoService = require('./prestamo.service')
exports.readPrestamosController = async (req, res) => {
    try {
        const prestamos = await prestamoService.getAllPrestamosService()
        if (prestamos.length === 0) {
            return res.status(404).send('No se encontraron préstamos')
        }
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).send(prestamos)
    } catch (error) {
        console.log("Error readPrestamos")
        res.status(500).send({ code: 500, message: "Error al obtener los préstamos" })
    }
}

exports.readPrestamosByDuenioController = async (req, res) => {
    try {
        const duenioId = req.params.id

        const prestamos = await prestamoService.getPrestamosByDuenioService(duenioId)
        if (!prestamos || prestamos.length === 0) {
            return res.status(404).send({
                code: 404,
                message: `No se encontraron préstamos para el dueño: ${duenioId}`
            })
        }
        res.status(200).send(prestamos)
    } catch (error) {
        console.log("Error readPrestamosByDuenio")
        res.status(500).send({ code: 500, message: "Error al obtener los préstamos del dueño" })
    }
}

exports.readPrestamosBySolicitanteController = async (req, res) => {
    try {
        const solicitanteId = req.params.id
  
        const prestamos = await prestamoService.getPrestamosBySolicitanteService(solicitanteId)
        if (!prestamos || prestamos.length === 0) {
            return res.status(404).send({
                code: 404,
                message: `No se encontraron préstamos para el solicitante: ${solicitanteId}`
            })
        }
        res.status(200).send(prestamos)
    } catch (error) {
        console.log("Error readPrestamosBySolicitante")
        res.status(500).send({ code: 500, message: "Error al obtener los préstamos del solicitante" })
    }
}

exports.readPrestamoByIdController = async (req, res) => {
    try {
        const id = req.params.id
        const prestamo = await prestamoService.getPrestamoByIdService(id)
        if (!prestamo) {
            return res.status(404).send({
                code: 404,
                message: `Préstamo no encontrado: ${id}`
            })
        }
        res.status(200).send(prestamo)
    } catch (error) {
        console.log("Error readPrestamoById", error)
        res.status(500).send({ code: 500, message: "Error al obtener el préstamo" })
    }
}

exports.createPrestamoController = async (req, res) => {
    try {
        const { objetoId, tiempo_del_prestamo } = req.body
        const solicitanteId = req.session.userId
   

        if (!objetoId || !tiempo_del_prestamo) {
            return res.status(400).send({ code: 400, message: "Faltan datos: objetoId y tiempo_del_prestamo son requeridos" })
        }

        const datosPrestamo = { objetoId, solicitanteId, tiempo_del_prestamo }
        const resultado = await prestamoService.createPrestamoService(datosPrestamo)

        if (resultado.error) {
            return res.status(resultado.status || 400).send({ code: resultado.status || 400, message: resultado.message })
        }

        res.status(201).send(resultado)
    } catch (error) {
        console.log("Error - CONTROLLER createPrestamo", error)
        res.status(500).send({ code: 500, message: "Error al crear la solicitud" })
    }
}

exports.updateEstadoPrestamoController = async (req, res) => {
    try {
        const prestamoId = req.params.id
        const { estado } = req.body
        const usuarioId = req.session.userId


        if (!estado || !['aceptado', 'rechazado'].includes(estado)) {
            return res.status(400).send({ code: 400, message: 'El estado debe ser "aceptado" o "rechazado"' })
        }

        const resultado = await prestamoService.updateEstadoPrestamoService(prestamoId, estado, usuarioId)

        if (resultado.error) {
            return res.status(resultado.status || 400).send({ code: resultado.status || 400, message: resultado.message })
        }

        res.status(200).send(resultado)
    } catch (error) {

        res.status(500).send({ code: 500, message: "Error al actualizar el estado del préstamo" })
    }
}