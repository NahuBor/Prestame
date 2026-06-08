const Objeto = require('../../models/objeto.model')

const crearObjeto = async (datosObjeto) => {
    const objeto = new Objeto(datosObjeto)
    return await objeto.save()
} 

