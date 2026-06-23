const authService = require('./authService')
const { mapResponse } = require('../../shared/utils/mapResponse')
const INTERNAL_ERROR = 'INTERNAL_ERROR'

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const respuestaService = await authService.loginService(email, password)
        if (!respuestaService.ok) {
            const {statusCode} = mapResponse(respuestaService.error)
            return res.status(statusCode).send({
                status: statusCode,
                message: respuestaService.error
            })
        }
        console.log(respuestaService.user)
        req.session.userId = respuestaService.user
        console.log("testing", req.session.userId)
        return res.status(200).send(respuestaService.user)
    } catch (error) {
        console.log("Ocurrió un error en loginController()");
        return res.status(500).send({
            status: 500,
            message: INTERNAL_ERROR
        })
    }
}

exports.registerController = async (req, res) => {
    try {
        const { nombre, password, email } = req.body
        const respuestaService = await authService.registerService(nombre, password, email)
        console.log("en el controller llega: ", respuestaService)
        if (!respuestaService.ok) {
            const {statusCode} = mapResponse(respuestaService.error)
            return res.status(statusCode).send({
                status: statusCode,
                message: respuestaService.error
            })

        }
        return res.status(201).send({
            status: 201,
            user: respuestaService.user
        })
    } catch (error) {
        console.log("Error en registerController()");
        return res.status(500).send(
            {
                status: 500,
                message: INTERNAL_ERROR
            }
        )
    }
}

exports.perfil = async (req, res) => {
     try {
        const user = await authService.findById(req.session.userId)
        return res.status(200).send({
            nombre: user.nombre,
            email: user.email,
            _id: user._id
        })
    } catch (error) {
        console.log("Error en perfil controller:", error.message) 
        return res.status(500).send("Error en el servidor")
    }
}

exports.logoutController = async (req, res) => {
    try {
        if (!req.session) {
            return res.status(403).send({
                status: 401,
                message: 'SESSION NOT FOUND - ACCESS INVALID'
            })
        }
        req.session.destroy((err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: 'Error al destruir la sesión' })
            }
            return res.status(200).json({ message: 'Se ha deslogueado correctamente' })
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor al desloguarse' })
    }
}
