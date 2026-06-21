const mongoose = require('mongoose')

const prestamoSchema = new mongoose.Schema({
    
    objetoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Objeto', required: true },
    duenioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    estado: { type: String, enum: ['pendiente', 'aceptado','rechazado', 'devuelto'], default: 'pendiente' },
    fechaCreacion: { type: Date, default: Date.now },
    fechaDevolucion: { type: Date},
    tiempo_del_prestamo:{type: String, enum: ['1', '7', '30'], default: '1', required: true}



    },

)

module.exports = mongoose.model('Prestamo', prestamoSchema)