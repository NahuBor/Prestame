const Prestamo = require('../../shared/models/prestamo.model.js')
const { getConnectMongoDB } = require('../../database/databaseConection')

const EMPTY_ARRAY = []




exports.getAllprestamosRepository = async () => {
    try {
        console.log(" MONGO DBREPOSITORY - getAllPrestamosRepository ")
        const prestamos = await Prestamo.find();
        console.log(prestamos);
        return prestamos; 
    } catch (error) {
        console.log("Error en getAllPrestamosRepository ", error)
        return EMPTY_ARRAY;
    }
}

exports.crearPrestamoRepository = async (datosPrestamo) => {
    try {
        console.log("REPOSITORY - crearPrestamo", datosPrestamo)
        const prestamo = new Prestamo(datosPrestamo)
        return await prestamo.save()
    } catch (error) {
        console.log("Error en crearPrestamoRepository", error)
        return null
    }
}