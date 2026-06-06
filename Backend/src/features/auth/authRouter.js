const express = require('express')
const authRouter = express.Router()
const {authMiddleware} = require('../middlewares/authMiddleware')
const {authController} = require('./authController')

authRouter.post('/', authMiddleware, authController.login)

