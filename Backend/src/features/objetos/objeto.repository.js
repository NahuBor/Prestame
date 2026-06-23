const Objeto = require('../../shared/models/objeto.model.js')
const { getConnectMongoDB } = require('../../database/databaseConection')

const EMPTY_ARRAY = []


exports.crearObjetoRepository = async (datosObjeto) => {
    try {
        console.log("REPOSITORY - crearObjeto", datosObjeto)
        const objeto = new Objeto(datosObjeto)
        return await objeto.save()
    } catch (error) {
        console.log("Error en crearObjetoRepository")
        return EMPTY_ARRAY
    }
}


exports.editarObjetoRepository = async (id, objetoActualizado) => {
    try {
        const objetoEditado = await Objeto.findByIdAndUpdate(id, objetoActualizado, { new: true })
        if (!objetoEditado) {
            console.log("objeto no encontrado")
            return EMPTY_ARRAY
        } else {
            console.log("objeto editado:", objetoEditado)
            return objetoEditado
        }
    } catch (error) {
        console.log("Error en editarObjetoRepository")
        return EMPTY_ARRAY
    }
}


exports.eliminarObjetoRepository = async (id) => {
    try {
        console.log("REPOSITORY - eliminarObjetoRepository - id:", id)
        const objetoEliminado = await Objeto.findByIdAndDelete(id)
        if (!objetoEliminado) {
            console.log("objeto no encontrado")
            return EMPTY_ARRAY
        } else {
            console.log("objeto eliminado:", objetoEliminado)
            return objetoEliminado
        }
    } catch (error) {
        console.log("Error en eliminarObjetoRepository")
        return EMPTY_ARRAY
    }
}

exports.getAllobjetsRepository = async () => {
    try {
        console.log(" MONGO DBREPOSITORY - getAllObjetsRepository ")
        const objetos = await Objeto.find();
        return objetos; 
    } catch (error) {
        console.log("Error en getAllObjetsRepository ")
        return EMPTY_ARRAY;
    }
}

exports.getObjetsByIdRepository = async (idParam) => {
    try {
        const objeto = await Objeto.findById(idParam).lean(); 
        if (!objeto) {
            return EMPTY_ARRAY;
        }
        return objeto;
    } catch (error) {
        if (error.name === 'CastError') {
            return EMPTY_ARRAY;
        }
        console.error("Error en getFrontendLanguagesFilteredByIdRepository:");
        console.log("Error en getObjetsByIdRepository ");
        return EMPTY_ARRAY; 
    }
};

exports.getObjectsByDuenioIdRepository = async (duenioIdParam) => {
    try {
        const objetos = await Objeto.find({ duenioId: duenioIdParam }).lean();
        if (!objetos || objetos.length === 0) {
            return EMPTY_ARRAY;
        }
        return objetos; 
    } catch (error) {
        if (error.name === 'CastError') {
            return EMPTY_ARRAY;
        }
        console.error("Error en getObjectsByDuenioIdRepository:");
        return EMPTY_ARRAY
    }
};

exports.getObjetsfilteredByCategoriaRepository = async (categoria) => {
    try {
        const objetos = await Objeto.find({ categoria: categoria });
        return objetos;
    } catch (error) {
        console.log(`Error en getObjetsByCategoriaRepository:`);
        return EMPTY_ARRAY;
    }
}


exports.updateEstadoObjetoRepository = async (objetoId, nuevoEstado) => {
    try {
        const objeto = await Objeto.findByIdAndUpdate(
            objetoId,
            { estado: nuevoEstado },
            { new: true }
        ).lean()
        return objeto
    } catch (error) {
        console.log("Error en updateEstadoObjetoRepository")
        return EMPTY_ARRAY
    }
}




