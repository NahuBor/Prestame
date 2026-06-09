const mongoose = require('mongoose')

const objetoSchema = new mongoose.Schema({
    duenioId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    titulo:       { type: String, required: true },
    descripcion:  { type: String },
    categoria:    { type: String, enum: ['herramientas', 'libros', 'otro'], required: true },
    estado:       { type: String, enum: ['disponible', 'prestado'], default: 'disponible' },
    fechaCreacion:{ type: Date, default: Date.now }
})

module.exports = mongoose.model('Objeto', objetoSchema)