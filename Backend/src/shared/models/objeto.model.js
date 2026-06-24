const mongoose = require('mongoose')

const objetoSchema = new mongoose.Schema({
    duenioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String },
    categoria: { type: String, enum: ['herramientas', 'libros', 'otro'], required: true },
    imagen: {
        data: { type: Buffer },
        contentType: { type: String }
    },
    estado: { type: String, enum: ['disponible', 'prestado'], default: 'disponible' },
    fechaCreacion: { type: Date, default: Date.now }
},{ collection: 'objetos' }
)

module.exports = mongoose.model('Objeto', objetoSchema)