

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
