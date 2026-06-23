const Objeto = require('../../shared/models/objeto.model.js')
const { getConnectMongoDB } = require('../../database/databaseConection')

const EMPTY_ARRAY = []

exports.crearObjetoRepository = async (datosObjeto) => {
    try {
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
            .populate('duenioId', 'nombre email')
        if (!objetoEditado) {
            return EMPTY_ARRAY
        } else {
            return objetoEditado
        }
    } catch (error) {
        console.log("Error en editarObjetoRepository")
        return EMPTY_ARRAY
    }
}

// DELETE
exports.eliminarObjetoRepository = async (id) => {
    try {
        const objetoEliminado = await Objeto.findByIdAndDelete(id)
        if (!objetoEliminado) {
            return EMPTY_ARRAY
        } else {
            return objetoEliminado
        }
    } catch (error) {
        console.log("Error en eliminarObjetoRepository")
        return EMPTY_ARRAY
    }
}


exports.getAllobjetsRepository = async () => {
    try {
        const objetos = await Objeto.find()
            .populate('duenioId', 'nombre email')
        return objetos;
    } catch (error) {
        console.log("Error en getAllObjetsRepository ")
        return EMPTY_ARRAY;
    }
}


exports.getObjetsByIdRepository = async (idParam) => {
    try {
        const objeto = await Objeto.findById(idParam)
            .populate('duenioId', 'nombre email')
            .lean();
        if (!objeto) {
            return EMPTY_ARRAY;
        }
        return objeto;
    } catch (error) {
        return EMPTY_ARRAY;
    }
};


exports.getObjectsByDuenioIdRepository = async (duenioIdParam) => {
    try {
        const objetos = await Objeto.find({ duenioId: duenioIdParam })
            .populate('duenioId', 'nombre email')
            .lean();
        if (!objetos || objetos.length === 0) {
            return EMPTY_ARRAY;
        }

        return objetos;
    } catch (error) {
        return EMPTY_ARRAY
    }
};


exports.getObjetsfilteredByCategoriaRepository = async (categoria) => {
    try {
        const objetos = await Objeto.find({ categoria: categoria }).populate('duenioId', 'nombre email')
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