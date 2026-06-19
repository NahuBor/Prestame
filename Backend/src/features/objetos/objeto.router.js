const express = require('express')
const objetoController = require('./objeto.controller')
const authMiddleware = require('../../middlewares/authMiddleware')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }  // Limitar el tamaño del archivo a 5MB
})

const manejarErrorMulter = (uploadMiddleware) => {
    return (req, res, next) => {
        uploadMiddleware(req, res, (error) => {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).send({ code: 400, message: "La imagen no puede superar los 5MB" })
                }
                return res.status(400).send({ code: 400, message: "Error al subir la imagen" })
            } else if (error) {
                return res.status(500).send({ code: 500, message: "Error inesperado al procesar la imagen" })
            }
            next()
        })
    }
}

const objetoRouter = express.Router()


objetoRouter.use(express.json());

objetoRouter.post('/',/*authMiddleware,*/manejarErrorMulter(upload.single('imagen')),objetoController.crearObjetoController)
objetoRouter.put('/:id',/*authMiddleware,*/manejarErrorMulter(upload.single('imagen')),objetoController.editarObjetoController)
objetoRouter.delete('/:id',/*authMiddleware,*/ objetoController.eliminarObjetoController)

objetoRouter.get('/',/*authMiddleware,*/ objetoController.readObjets);
objetoRouter.get('/:id',/*authMiddleware,*/ objetoController.readObjetsByIdcontroller)
objetoRouter.get('/duenio/:duenioId', objetoController.readObjetsByDuienioIdcontroller);
objetoRouter.get('/categoria/:categoria',/*authMiddleware,*/ objetoController.readObjetsByCategoriaController);


module.exports = objetoRouter


