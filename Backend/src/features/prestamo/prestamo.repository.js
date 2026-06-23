const Prestamo = require('../../shared/models/prestamo.model.js')
const EMPTY_ARRAY = []

exports.getAllprestamosRepository = async () => {
    try {
        return await Prestamo.find()
    } catch (error) {
        console.log("Error getAllPrestamosRepository", error)
        return EMPTY_ARRAY
    }
}

exports.crearPrestamoRepository = async (datosPrestamo) => {
    try {
        const prestamo = new Prestamo(datosPrestamo)
        return await prestamo.save()
    } catch (error) {
        console.log("Error crearPrestamoRepository", error)
        return null
    }
}


exports.getPrestamosByDuenioRepository = async (duenioId) => {
    try {
        const prestamos = await Prestamo.find({ duenioId })
            .populate('objetoId', 'titulo imagen categoria')
            .populate('duenioId', 'nombre email')
            .populate('solicitanteId', 'nombre email')
            .lean()
        return prestamos || EMPTY_ARRAY
    } catch (error) {
        console.log("Error getPrestamosByDuenioRepository", error)
        return EMPTY_ARRAY
    }
}


exports.getPrestamosBySolicitanteRepository = async (solicitanteId) => {
    try {
        const prestamos = await Prestamo.find({ solicitanteId })
            .populate('objetoId', 'titulo imagen categoria')
            .populate('duenioId', 'nombre email')
            .populate('solicitanteId', 'nombre email')
            .lean()
        return prestamos || EMPTY_ARRAY
    } catch (error) {
        console.log("Error getPrestamosBySolicitanteRepository", error)
        return EMPTY_ARRAY
    }
}

exports.getPrestamoByIdRepository = async (prestamoId) => {
    try {
        const prestamo = await Prestamo.findById(prestamoId)
            .populate('objetoId', 'titulo imagen categoria')
            .populate('duenioId', 'nombre email')
            .populate('solicitanteId', 'nombre email')
            .lean()
        return prestamo
    } catch (error) {
        console.log("Error getPrestamoByIdRepository", error)
        return null
    }
}

// Actualizar estado
exports.updateEstadoPrestamoRepository = async (prestamoId, nuevoEstado) => {
    try {
        const prestamo = await Prestamo.findByIdAndUpdate(
            prestamoId,
            { estado: nuevoEstado },
            { new: true }
        ).lean()
        return prestamo
    } catch (error) {
        console.log("Error updateEstadoPrestamoRepository", error)
        return null
    }
}