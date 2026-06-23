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

// UPDATE
exports.editarObjetoRepository = async (id, objetoActualizado) => {
    try {
        const objetoEditado = await Objeto.findByIdAndUpdate(id, objetoActualizado, { new: true })
            .populate('duenioId', 'nombre email')
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

// DELETE
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

// 🔥 GET ALL - Con populate para mostrar dueño
exports.getAllobjetsRepository = async () => {
    try {
        console.log("MONGO DB REPOSITORY - getAllObjetsRepository")
        const objetos = await Objeto.find()
            .populate('duenioId', 'nombre email')
        console.log(objetos);
        return objetos;
    } catch (error) {
        console.log("Error en getAllObjetsRepository ")
        return EMPTY_ARRAY;
    }
}

// 🔥 GET BY ID - Con populate para mostrar dueño
exports.getObjetsByIdRepository = async (idParam) => {
    try {
        const objeto = await Objeto.findById(idParam)
            .populate('duenioId', 'nombre email')
            .lean();
        
        if (!objeto) {
            return EMPTY_ARRAY;
        }
        
        console.log('🔍 OBJETO ENCONTRADO:');
        console.log('  - duenioId:', JSON.stringify(objeto.duenioId, null, 2));
        console.log('  - tipo de duenioId:', typeof objeto.duenioId);
        
        if (typeof objeto.duenioId === 'object' && objeto.duenioId !== null) {
            console.log('  - duenioId.nombre:', objeto.duenioId.nombre);
            console.log('  - duenioId.email:', objeto.duenioId.email);
        } else {
            console.log('  ⚠️ duenioId NO está populado, es un string:', objeto.duenioId);
        }
        
        return objeto;
    } catch (error) {
        if (error.name === 'CastError') {
            return EMPTY_ARRAY;
        }
        console.error("Error en getObjetsByIdRepository:", error);
        return EMPTY_ARRAY;
    }
};

// 🔥 GET BY DUEÑO - Con populate para mostrar dueño
exports.getObjectsByDuenioIdRepository = async (duenioIdParam) => {
    try {
        const objetos = await Objeto.find({ duenioId: duenioIdParam })
            .populate('duenioId', 'nombre email')
            .lean();
        if (!objetos || objetos.length === 0) {
            return EMPTY_ARRAY;
        }
        console.log("OBJETOS DEL DUEÑO:", objetos);
        return objetos;
    } catch (error) {
        if (error.name === 'CastError') {
            return EMPTY_ARRAY;
        }
        console.error("Error en getObjectsByDuenioIdRepository:", error);
        return EMPTY_ARRAY
    }
};

// 🔥 GET BY CATEGORIA - Con populate para mostrar dueño
exports.getObjetsfilteredByCategoriaRepository = async (categoria) => {
    try {
        console.log(`MONGO DB REPOSITORY - getObjetsByCategoriaRepository: ${categoria}`);
        const objetos = await Objeto.find({ categoria: categoria })
            .populate('duenioId', 'nombre email')
        console.log(`Encontrados ${objetos.length} objetos en categoría: ${categoria}`);
        return objetos;
    } catch (error) {
        console.log(`Error en getObjetsByCategoriaRepository:`);
        return EMPTY_ARRAY;
    }
}

// 🔥 UPDATE ESTADO - Sin populate para que sea rápido y no rompa
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