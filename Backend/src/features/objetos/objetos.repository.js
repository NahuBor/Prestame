

//const objetos = require('../../shared/models/models.js').objetos;
const Objetos= require('../../shared/models/models.js')

getConnectMongoDB();

exports.getAllobjetsRepository = async () =>{
    
    try {
         console.log(" MONGO DBREPOSITORY - getAllObjetsRepository ")
         const objetos = await Objetos.find(); 
         console.log(objetos);
         return await JSON.stringify(objetos)
    } catch (error) {
        console.log("Error en getAllObjetsRepository ", error)
    }
   
}

exports.getAllFrontendLanguagesRepository = async () => {
    try {        
        console.log("MONGO DB REPOSITORY - getAllFrontendLanguagesRepository ")
        const lenguajes = await Lenguajes.find();
        console.log(lenguajes)
        return await JSON.stringify(lenguajes)
    } catch (error) {
        console.log("SQL Error en getAllFrontendLanguagesRepository ", error)
    }

}



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





// CREATE
exports.crearObjetoRepository = async (datosObjeto) => {
    try {
        console.log("REPOSITORY - crearObjeto", datosObjeto)
        const objeto = new Objeto(datosObjeto)
        return await objeto.save()
    } catch (error) {
        throw error
    }
}

//UPDATE
exports.editarObjetoRepository = async (id, objetoActualizado) => {
    try {
        console.log("REPOSITORY - editarObjetoRepository - id:", id, "- objetoActualizado:", objetoActualizado)
        return await Objeto.findByIdAndUpdate(id, objetoActualizado, { new: true })
    } catch (error) {
        throw error
    }
}

//DELETE
exports.eliminarObjetoRepository = async (id) => {
    try {
        console.log("REPOSITORY - eliminarObjetoRepository - id:", id)
        return await Objeto.findByIdAndDelete(id)
    } catch (error) {
        throw error
    }
}
