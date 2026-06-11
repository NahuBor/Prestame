const express = require('express')
const objetoController = require('./objeto.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

const objetoRouter = express.Router()

objetoRouter.post('/', authMiddleware, objetoController.crearObjetoController)
objetoRouter.put('/:id', authMiddleware, objetoController.editarObjetoController)
objetoRouter.delete('/:id', authMiddleware, objetoController.eliminarObjetoController)

module.exports = objetoRouter