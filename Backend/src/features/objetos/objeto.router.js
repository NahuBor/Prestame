const express = require('express')
const objetoController = require('./objeto.controller')

const objetoRouter = express.Router()

objetoRouter.post('/', objetoController.crearObjetoController)

module.exports = objetoRouter