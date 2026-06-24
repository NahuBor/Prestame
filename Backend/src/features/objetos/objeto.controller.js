const objetoService = require('./objeto.service')


exports.crearObjetoController = async (req, res) => {
    try {
        const nuevoObjeto = {
            ...req.body,
            duenioId: req.session.userId,
            estado: 'disponible'
        }
        if (req.file) {
            nuevoObjeto.imagen = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }
        
        const objeto = await objetoService.crearObjetoService(nuevoObjeto)
        if (!objeto || objeto.length === 0) {
            return res.status(400).send({
                code: 400,
                message: "No se pudo crear el objeto"
            })
        }
        res.status(200).send(objeto)
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: "Error al agregar el nuevo Objeto"
        })
    }
}

exports.editarObjetoController = async (req, res) => {
    try {
        const id = req.params.id
        const objetoActualizado = req.body

        if (req.file) {
            objetoActualizado.imagen = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }
        const objeto = await objetoService.editarObjetoService(id, objetoActualizado)
        if (!objeto || objeto.length === 0) {
            return res.status(404).send({
                code: 404,
                message: `No se encuentra un objeto a modificar con el id: ${id}`
            })
        }
        res.status(200).send(objeto)
    } catch (error) {
        res.status(500).send({ code: 500, message: "Error al editar el objeto" })
    }
}

exports.eliminarObjetoController = async (req, res) => {
    try {
        const idObjeto = req.params.id
        const objeto = await objetoService.eliminarObjetoService(idObjeto)
        if (!objeto || objeto.length === 0) {
            return res.status(404).send({
                code: 404,
                message: `No se encuentra un objeto a eliminar con el id: ${idObjeto}`
            })
        }
        res.status(200).send({ code: 200, message: "Objeto eliminado correctamente" })
    } catch (error) {
        res.status(500).send({ code: 500, message: "Error al eliminar el objeto" })
    }
}

exports.readObjets = async (req, res) => {
    try {
        const objetos = await objetoService.getAllObjets()
        if (objetos.length === 0) {
            return res.status(404).send('No se encontraron objetos')
        }
        const objetoConImagen = objetos.map(objeto => {
            const objetoPlano = { ...objeto._doc || objeto }
            if (objetoPlano.imagen && objetoPlano.imagen.data) {
                const base64 = objetoPlano.imagen.data.toString('base64')
                objetoPlano.imagen = `data:${objetoPlano.imagen.contentType};base64,${base64}`
            }
            return objetoPlano
        })
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).send(objetoConImagen)
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: "Error al obtener los objetos"
        })
    }
}

exports.readObjetsByIdcontroller = async (req, res) => {
    const idParam = req.params.id;
    const objetoFiltrado = await objetoService.getObjetsfilteredByIdService(idParam)

    if (!objetoFiltrado || objetoFiltrado.length === 0) {
        return res.status(404).send({
            code: 404,
            message: `No se encontró el objeto con el id: ${idParam}`
        })
    }
    const objetoPlano = { ...objetoFiltrado._doc || objetoFiltrado }
    if (objetoPlano.imagen && objetoPlano.imagen.data) {
        const base64 = objetoPlano.imagen.data.toString('base64')
        objetoPlano.imagen = `data:${objetoPlano.imagen.contentType};base64,${base64}`
    }
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).send(objetoPlano)
}

exports.readObjetsByDuienioIdcontroller = async (req, res) => {
    const duenioIdParam = req.params.duenioId;
    const objetoFiltrado = await objetoService.getObjetsfilteredByDuenioIdService(duenioIdParam)

    if (objetoFiltrado.length === 0) {
        return res.status(404).send({
            code: 404,
            message: `No se encontró el objeto con el id: ${duenioIdParam}`
        })
    }

    const objetoConImagen = objetoFiltrado.map(objeto => {
        const objetoPlano = { ...objeto._doc || objeto }
        if (objetoPlano.imagen && objetoPlano.imagen.data) {
            const base64 = objetoPlano.imagen.data.toString('base64')
            objetoPlano.imagen = `data:${objetoPlano.imagen.contentType};base64,${base64}`
        }
        return objetoPlano
    })
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).send(objetoConImagen)
}

exports.readObjetsByCategoriaController = async (req, res) => {
    try {
        const categoriaParam = req.params.categoria;
        const objetoFiltrado = await objetoService.getObjetsfilteredByCategoriaService(categoriaParam)

        if (objetoFiltrado.length === 0) {
            return res.status(404).send(`No se encontraron objetos en la categoría: ${categoriaParam}`)
        }

        const objetoConImagen = objetoFiltrado.map(objeto => {
            const objetoPlano = { ...objeto._doc || objeto }
            if (objetoPlano.imagen && objetoPlano.imagen.data) {
                const base64 = objetoPlano.imagen.data.toString('base64')
                objetoPlano.imagen = `data:${objetoPlano.imagen.contentType};base64,${base64}`
            }
            return objetoPlano
        })
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).send(objetoConImagen)
    } catch (error) {
        console.log(" Error readObjetsByCategoriaController");
        res.status(500).send({
            code: 500,
            message: "Error al obtener los objetos por categoría"
        })
    }
}