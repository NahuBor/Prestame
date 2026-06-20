const authRepository = require('./authRepository')
const bcrypt = require('bcrypt')
const User = require('../../shared/models/user.model')
const {createMessage, typeErrorAuth} = require('../../shared/utils/error_messages')

exports.loginService = async (email, password) => {
    try {
        const usuarioEncontrado = await authRepository.findByEmailRepository(email)
        if (!usuarioEncontrado) {
            return createMessage(typeErrorAuth.INVALIDAD_CREDENTIALS)
        }
        if (usuarioEncontrado.activo == false) {
            return createMessage(typeErrorAuth.USER_NOT_ACTIVE)
        }
        const isMatch = await bcrypt.compare(password, usuarioEncontrado.passwordHash)
        if (!isMatch) {
            return createMessage(typeErrorAuth.LOGIN_FAILED)
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
        console.log("Error en LoginService()", error)
        return createMessage(typeErrorAuth.INTERNAL_ERROR)
    }
}

exports.registerService = async (nombre, password, email) => {
    try {
         userFounded = await authRepository.findByEmailRepository(email)
        console.log("el valor de userfounded es: ", userFounded)
        if (userFounded) {
            return createMessage(typeErrorAuth.USER_ALREADY_EXISTS)
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const userTemp = {
            nombre,
            email,
            passwordHash,
            activo: true
        }
        const userCreated = await authRepository.createUserRepository(userTemp)
        return {
            ok: true,
            user: {
                _id: userCreated._id,
                nombre: userCreated.nombre,
                email: userCreated.email,
                activo: userCreated.activo
            }
        }
    } catch (error) {
        console.log("este es el error amigooo", error)
        return createMessage(typeErrorAuth.INTERNAL_ERROR)
    }
}

exports.findById = async (id) => {
    try {
        const user = await authRepository.findUserById(id)
        return user
    } catch (error) {
        console.log("Error - En findById, capa service")
        return undefined
    }
}