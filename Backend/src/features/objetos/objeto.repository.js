const Objeto = require('../../shared/models/objeto.model.js')
const { getConnectMongoDB } = require('../../database/databaseConection')
const EMPTY_ARRAY = []
getConnectMongoDB();

// CREATE
exports.crearObjetoRepository = async (datosObjeto) => {
    try {
        console.log("REPOSITORY - crearObjeto", datosObjeto)
        const objeto = new Objeto(datosObjeto)
        return await objeto.save()
    } catch (error) {
        console.log("Error en crearObjetoRepository", error)
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
    }
}




exports.getAllobjetsRepository = async () =>{
    
    try {
        console.log(" MONGO DBREPOSITORY - getAllObjetsRepository ")
        const objetos = await Objeto.find(); 
        console.log(objetos);
        return await JSON.stringify(objetos)
    } catch (error) {
        console.log("Error en getAllObjetsRepository ", error)
    }
}
exports.getObjetsByIdRepository = async (idParam) => {
    try {
        const objeto = await Objeto.findById(idParam).lean(); // .lean() retorna objetos JavaScripts planos, no documentos Mongoose (más rápido)

        if (!objeto) {
            return EMPTY_ARRAY;
        }
        console.log("OBEJTO"+ objeto)
        return [objeto];
    } catch (error) {
        // Si el ID no es un formato válido de MongoDB, capturamos el error
        if (error.name === 'CastError') {
            return EMPTY_ARRAY;
        }
        console.error("Error en getFrontendLanguagesFilteredByIdRepository:", error);
        throw error;
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
        throw error;
    }
};






exports.getObjetsFilteredRepository = async (lenguaje, orderby) =>{

    const filtrado = objetos.filter(
        objetos => objetos.id.toLocaleLowerCase() === lenguaje.toLocaleLowerCase()
    )

    if(filtrado.length === 0){
        return []
    }

    if(orderby === 'arriba'){
        return filtrado.sort(
            (a,b) => b.cantidadAlumnos - a.cantidadAlumnos
        )
    }
    else if (orderby === 'abajo'){
        return filtrado.sort(
            (a,b) => a.cantidadAlumnos - b.cantidadAlumnos
        )
    }else{
        return filtrado
    }

}




