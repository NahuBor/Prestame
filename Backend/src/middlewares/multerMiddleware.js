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

module.exports = {
    uploadImagen: manejarErrorMulter(upload.single('imagen'))
}