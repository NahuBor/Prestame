const express = require('express')
const prestamoController = require('./prestamo.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

const prestamoRouter = express.Router()

prestamoRouter.use(express.json());

prestamoRouter.get('/',/*authMiddleware,*/ prestamoController.readPrestamosController);
prestamoRouter.post('/',/*authMiddleware,*/ prestamoController.createPrestamoController);

module.exports = prestamoRouter