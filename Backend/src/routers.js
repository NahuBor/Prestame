// Este sera el router principal, acá dirigeremos a los routers especificos de cada feature
const express = require('express')
const mainRouter = express.Router()
const authRouter = require('./features/auth/authRouter')
const objetoRouter = require('./features/objetos/objeto.router')

mainRouter.use('/auth', authRouter)
mainRouter.use('/objetos', objetoRouter)

module.exports = mainRouter;