const express = require('express');

const ObjetController = require('./objetos.controller');  

const routerObjetos = express.Router();
routerObjetos.use(express.json());

routerObjetos.get('/', ObjetController.readObjets);

routerObjetos.get('/:id', ObjetController.readObjetsByIdcontroller)
routerObjetos.get('/duenio/:duenioId', ObjetController.readObjetsByDuienioIdcontroller);
module.exports = routerObjetos;