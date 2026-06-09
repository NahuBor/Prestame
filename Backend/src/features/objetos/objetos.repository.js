const objetos = require('../../shared/models/models.js').objetos;

exports.getAllobjetsRepository = async () =>{
    
    try {
         console.log("REPOSITORY - getAllObjetsRepository ")
         return await JSON.stringify(objetos)
    } catch (error) {
        console.log("Error en getAllObjetsRepository ", error)
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
