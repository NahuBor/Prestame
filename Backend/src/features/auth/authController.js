const authService = require('./authService')
const { INVALIDAD_CREDENTIALS, USER_NOT_ACTIVE, INTERNAL_ERROR } = require('../../shared/utils/error_messages')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await authService.login(email, password)
        if (result.code == 'INVALID_CREDENTIALS') {
            return res.status(401).send({
                status: 401,
                message: INVALIDAD_CREDENTIALS
            })
        }
        if (result.code == 'USER_NOT_ACTIVE') {
            return res.status(401).send({
                status: 401,
                message: USER_NOT_ACTIVE
            })
        }
        req.session.userId = result.user._id
        return res.status(200).send({
            status: 200,
            user: result.user
        })
    } catch (error) {
        console.log("ERROR - Ocurrió un error en el login(), de la capa controller")
        return res.status(500).send({
            status: 500,
            message: INTERNAL_ERROR
        })
    }
}

exports.register = async (req, res) => {
    try {
        console.log(req.body)
        const { nombre, password, email } = req.body
        const result = await authService.register(nombre, password, email)
        if (!result.ok) {
            if (result.code == 'USER_ALREADY_EXISTS') {
                return res.status(400).send({
                    status: 400,
                    message: result.code
                })
            }
        }
        if (result.code == 'USER_ALREADY_EXISTS') {
            return res.status(400).send({
                status: 400,
                message: result.code
            })
        }
        return res.status(201).send({
            status: 201,
            user: result.user
        })
    } catch (error) {
        console.log("Error controller: metodo register")
        console.log(error)
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
        console.log("Usuario autorizado a perfil")
        return res.status(200).send("Acceso autorizado a perfil")
    } catch (error) {
        console.log("Error - No se pudo acceder a /perfil")
        return res.status(500).send("Error en el servidor")
    }
}

exports.logout = async (req, res) => {
    try {
        if (!req.session) {
            return res.status(403).send({
                status: 403,
                message: 'SESSION NOT FOUND'
            })
        }
        req.session.destroy((err) => {
            if (err) {
                console.log(err)
            }
        })
        return res.status(200).send("Se ha deslogueado correctamente")

    } catch (error) {
        return res.status(500).send("Error en el servidor al desloguarse")
    }
}
