const Objeto = require('../../shared/models/objeto.model.js')
const { getConnectMongoDB } = require('../../database/databaseConection')

const EMPTY_ARRAY = []

// CREATE
exports.crearObjetoRepository = async (datosObjeto) => {
    try {
        console.log("REPOSITORY - crearObjeto", datosObjeto)
        const objeto = new Objeto(datosObjeto)
        return await objeto.save()
    } catch (error) {
        console.log("Error en crearObjetoRepository", error)
        return EMPTY_ARRAY
    }
}

//UPDATE
exports.editarObjetoRepository = async (id, objetoActualizado) => {
    try {
        console.log("REPOSITORY - editarObjetoRepository - id:", id, "- objetoActualizado:", objetoActualizado)
        const objetoEditado = await Objeto.findByIdAndUpdate(id, objetoActualizado, { new: true })
        if (!objetoEditado) {
            console.log("objeto no encontrado")
            return EMPTY_ARRAY
        } else {
            console.log("objeto editado:", objetoEditado)
            return objetoEditado
        }
    } catch (error) {
        console.log("Error en editarObjetoRepository", error)
        return EMPTY_ARRAY
    }
}

//DELETE
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
        console.log("Error en eliminarObjetoRepository", error)
        return EMPTY_ARRAY
    }
}

exports.getAllobjetsRepository = async () => {
    try {
        console.log(" MONGO DBREPOSITORY - getAllObjetsRepository ")
        const objetos = await Objeto.find();
        console.log(objetos);
        return objetos; 
    } catch (error) {
        console.log("Error en getAllObjetsRepository ", error)
        return EMPTY_ARRAY;
    }
}

exports.getObjetsByIdRepository = async (idParam) => {
    try {
        const objeto = await Objeto.findById(idParam).lean(); // .lean() retorna objetos JavaScripts planos, no documentos Mongoose (más rápido)
        if (!objeto) {
            return EMPTY_ARRAY;
        }
        console.log("OBEJTO" + objeto)
        return objeto;
    } catch (error) {
        // Si el ID no es un formato válido de MongoDB, capturamos el error
        if (error.name === 'CastError') {
            return EMPTY_ARRAY;
        }
        console.error("Error en getFrontendLanguagesFilteredByIdRepository:", error);
        console.log("Error en getObjetsByIdRepository ", error);
        return EMPTY_ARRAY; 
    }
};

exports.getObjectsByDuenioIdRepository = async (duenioIdParam) => {
    try {
        // Buscar todos los objetos que pertenezcan a ese duenioId
        const objetos = await Objeto.find({ duenioId: duenioIdParam }).lean();
        // Si no hay objetos, devolvemos array vacío
        if (!objetos || objetos.length === 0) {
            return EMPTY_ARRAY;
        }
        console.log("OBJETOS DEL DUEÑO:", objetos);
        return objetos; // ya es un array
    } catch (error) {
        // Si el ID no es un formato válido de MongoDB
        if (error.name === 'CastError') {
            return EMPTY_ARRAY;
        }
        console.error("Error en getObjectsByDuenioIdRepository:", error);
        console.log("Error en etObjectsByDuenioIdRepository ", error);
        return EMPTY_ARRAY
    }
};

exports.getObjetsfilteredByCategoriaRepository = async (categoria) => {
    try {
        console.log(`MONGO DBREPOSITORY - getObjetsByCategoriaRepository: ${categoria}`);
        const objetos = await Objeto.find({ categoria: categoria });
        console.log(`Encontrados ${objetos.length} objetos en categoría: ${categoria}`);
        return objetos;
    } catch (error) {
        console.log(`Error en getObjetsByCategoriaRepository:`, error);
        return EMPTY_ARRAY;
    }
}







