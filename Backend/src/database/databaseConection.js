const mongoose = require('mongoose')
const {dbConfig} = require('./dbConfig')
const dotenv = require('dotenv').config()


//const URI = `mongodb+srv://${dbConfig.USER_DB}:${dbConfig.PASSWORD_DB}@prestamecluster.m8k2mnl.mongodb.net/${dbConfig.NAME_DB}?retryWrites=true&w=majority&appName=PrestameCluster`;

exports.getConnectMongoDB = async () => {
    try {
    const mongoConnection = await mongoose.connect( process.env.MONGO_URI)
    if (mongoConnection) {
        console.log("Conexion con la base de datos lograda :)")
    }
} catch (error) {
        console.log("Error en la base de datos!")
    }
}

//this.getConnectMongoDB();