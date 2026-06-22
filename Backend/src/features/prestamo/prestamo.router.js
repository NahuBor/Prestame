const express = require('express')
const prestamoController = require('./prestamo.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

const prestamoRouter = express.Router()
prestamoRouter.use(express.json())

prestamoRouter.get('/duenio/:id', authMiddleware, prestamoController.readPrestamosByDuenioController)
prestamoRouter.get('/solicitante/:id', authMiddleware, prestamoController.readPrestamosBySolicitanteController)
prestamoRouter.put('/:id/estado', authMiddleware, prestamoController.updateEstadoPrestamoController)

prestamoRouter.get('/', authMiddleware, prestamoController.readPrestamosController)
prestamoRouter.post('/', authMiddleware, prestamoController.createPrestamoController)
prestamoRouter.get('/:id', authMiddleware, prestamoController.readPrestamoByIdController)

module.exports = prestamoRouter