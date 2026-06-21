const express = require('express')
const objetoController = require('./objeto.controller')
const authMiddleware = require('../../middlewares/authMiddleware')
const multer = require('../../middlewares/multerMiddleware')


const objetoRouter = express.Router()


objetoRouter.use(express.json());

objetoRouter.post('/',authMiddleware,uploadImagen,objetoController.crearObjetoController)
objetoRouter.put('/:id',authMiddleware,uploadImagen,objetoController.editarObjetoController)
objetoRouter.delete('/:id',authMiddleware, objetoController.eliminarObjetoController)

objetoRouter.get('/',authMiddleware, objetoController.readObjets);
objetoRouter.get('/duenio/:duenioId',authMiddleware, objetoController.readObjetsByDuienioIdcontroller);
objetoRouter.get('/categoria/:categoria',authMiddleware, objetoController.readObjetsByCategoriaController);
objetoRouter.get('/:id',authMiddleware, objetoController.readObjetsByIdcontroller)


module.exports = objetoRouter


