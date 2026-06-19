const authRepository = require('./authRepository')
const bcrypt = require('bcrypt')
const User = require('../../shared/models/user.model')
const { INVALIDAD_CREDENTIALS, USER_NOT_ACTIVE, INTERNAL_ERROR, USER_ALREADY_EXISTS } = require('../../shared/utils/error_messages')



exports.login = async (email, password) => {
    try {
        const usuarioEncontrado = await authRepository.findByEmail(email)
        if (usuarioEncontrado == null) {
            return {
                ok: false,
                error: INVALIDAD_CREDENTIALS
            }
        }
        if (usuarioEncontrado.activo == false) {
            return {
                ok: false,
                error: USER_NOT_ACTIVE
            }
        }
        const isMatch = await bcrypt.compare(password, usuarioEncontrado.passwordHash)
        if (!isMatch) {
            return {
                ok: false,
                error: INVALIDAD_CREDENTIALS
            }
        }
        return {
            ok: true,
            user: {
                _id: usuarioEncontrado._id,
                nombre: usuarioEncontrado.nombre,
                email: usuarioEncontrado.email,
                activo: usuarioEncontrado.activo
            }
        }

    } catch (error) {
        console.log("Hubo un error en el login, capa service")
        return {
            ok: false,
            error: INTERNAL_ERROR
        }
    }
}

exports.register = async (nombre, password, email) => {
    try {
        console.log("hola")
        if (await authRepository.findByEmail(email)) {
            return {
                ok: false,
                error: USER_ALREADY_EXISTS
            }
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const userTemp = {
            nombre,
            email,
            passwordHash,
            activo: true
        }
        const userCreated = await authRepository.createUser(userTemp)
        return {
            ok: true,
            user: userCreated
        }
    } catch (error) {
        console.log("ERROR - En metodo register, capa service")
        return {
            ok: false,
            code: INTERNAL_ERROR
        }
    }
}