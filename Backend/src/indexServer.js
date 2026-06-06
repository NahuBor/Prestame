const express = require('express')
const {sessionMiddleware} = require('../config/session.config')
const app = express()

app.use(sessionMiddleware)

const PORT = 3000;

const HOST = '127.0.0.1';

app.get('/', (req, res) => {
    res.status(200).send("Bienvenido a Prestame - API REST!");
})

app.listen(PORT, HOST, () => {
    console.log(`Server corriendo en http://${HOST}:${PORT}`);
})