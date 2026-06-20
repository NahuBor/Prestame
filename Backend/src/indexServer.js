const express = require('express')
const { sessionMiddleware } = require('./config/session.config')
const { getConnectMongoDB } = require('./database/databaseConection')  
const routers = require('./routers')
const app = express()

const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

app.use(express.json())
app.use(sessionMiddleware())
app.use('/', routers)


const PORT = 3000;
const HOST = '127.0.0.1';

app.get('/', (req, res) => {
    res.status(200).send("Bienvenido a Prestame - API REST!");
})


app.listen(PORT, HOST, () => {
    console.log(`Server corriendo en http://${HOST}:${PORT}`);
})

