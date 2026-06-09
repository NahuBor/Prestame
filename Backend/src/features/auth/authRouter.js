const express = require('express')
const authRouter = express.Router()
const authController = require('./authController')
const authMiddleware = require('../../middlewares/authMiddleware')


authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)
authRouter.get('/perfil', authMiddleware, authController.perfil)
authRouter.post('/logout', authController.logout)
module.exports = authRouter

