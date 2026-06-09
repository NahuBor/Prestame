const authRepository = require('./authRepository')
const bcrypt = require('bcrypt')
const User = require('../../shared/models/user.model')

exports.login = async (email, password) => {
    try {
        const usuarioEncontrado = await authRepository.findByEmail(email)
        if (!usuarioEncontrado) {
            console.log("No se encontró un usuario con ese email")        
            return undefined
        }
        if (!usuarioEncontrado.activo) {
            return undefined
        }
        const isMatch = await bcrypt.compare(password, usuarioEncontrado.passwordHash)
        if (!isMatch) {
            console.log("Las contraseñas no coinciden")
            return undefined
        } 
        return usuarioEncontrado

    } catch (error) {
        console.log("Hubo un error en el login, capa service")
        return undefined
    }
}

exports.register = async(nombre, password, email) => {
    try {
    if (await authRepository.findByEmail(email)) {
        console.log("Ya existe un usuario con ese mismo email. Intente con algún otro, por favor.")
        return undefined
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const userTemp = {
        nombre,
        email,
        passwordHash,
        activo: true
    }
    const userCreated = await authRepository.createUser(userTemp)
    return userCreated    
    } catch (error) {
        console.log("ERROR - En metodo register, capa service")
    }
}