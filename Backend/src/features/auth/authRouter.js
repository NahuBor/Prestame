const express = require('express')
const authRouter = express.Router()
const authController = require('./authController')
const authMiddleware = require('../../middlewares/authMiddleware')


authRouter.post('/login', authController.loginController)
authRouter.post('/register', authController.registerController)
authRouter.get('/perfil', authMiddleware, authController.perfil)
authRouter.post('/logout', authController.logoutController)
authRouter.post('/checkSession', authMiddleware, (req, res) => {
    return res.status(200).send(true)
})


module.exports = authRouter

