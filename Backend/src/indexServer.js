const express = require('express')
const app = express()
const routers = require('./routers')
const { sessionMiddleware } = require('./config/session.config')
const { getConnectMongoDB } = require('./database/databaseConection')  

const cors = require('cors')

const PORT = 3000
const HOST = '127.0.0.1'

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

app.use(express.json())

const startServer = async () => {
    try {
        await getConnectMongoDB()
        app.use(sessionMiddleware()) 
        app.use('/', routers) // 👈 Montar rutas

        // 👇 Escuchar DESPUÉS de montar todo
        app.listen(PORT, HOST, () => {
            console.log(`Server corriendo en http://${HOST}:${PORT}`);
        })

    } catch (error) {
        console.error("Error crítico al iniciar el servidor:", error)
    }
}

startServer()