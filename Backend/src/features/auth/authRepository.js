const User = require('../../shared/models/user.model')
const { getConnectMongoDB } = require('../../database/databaseConection')

getConnectMongoDB()

exports.findByEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email })
        return user
    } catch (error) {
        console.log("Error - en la la busqueda del user, capa repo")
        return undefined
    }
}

exports.createUser = async (user) => {
    try {
        const userCrated = await User.create(user)
        return await userCrated.save()
    } catch (error) {
        console.log("Error - En el metodo createUser, capa repo", error)
        return undefined
    }
}

exports.findUserById = async (id) => {
    try {
        const user = await User.findById(id)
        return user
    } catch (error) {
        console.log("Error - En el metodo findUserById, capa repo")
        return undefined
    }
}

