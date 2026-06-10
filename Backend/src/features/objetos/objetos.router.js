const express = require('express')

const ObjetController = require('objetos.controller')

const routerObjetos = express.Router();

routerObjetos.use(express.json());

routerObjetos.get('/', ObjetController.readObjetsLanguages)