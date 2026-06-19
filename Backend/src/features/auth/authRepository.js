const User = require('../../shared/models/user.model')
const { getConnectMongoDB } = require('../../database/databaseConection')



const EMPTY_ARRAY = []

exports.findByEmailRepository = async (email) => {
    try {
        const usuario = await User.findOne({ email: email })
        return usuario
    } catch (error) {
        console.log("Error en crearObjetoRepository")
        throw error
    }
}

exports.createUserRepository = async (user) => {
    try {
        const userCrated = await User.create(user)
        return await userCrated.save()
    } catch (error) {
        console.log("Error en crearObjetoRepository")
        throw error
    }
}

exports.findUserByIdRepository = async (id) => {
    try {
        const user = await User.findById(id)
        return user
    } catch (error) {
        console.log("Error en findUserByIdRepository")
        throw error
    }
}

