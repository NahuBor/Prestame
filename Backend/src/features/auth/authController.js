const authService = require('./authService')

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await authService.login(email, password)
        if (!user) {
            return res.status(401).send("Email o contraseña no validos")
        }
        req.session.userId = user._id
        return res.status(200).send({
            user: user.nombre, 
            email: user.email,
            id: user._id,
            activo: user.activo
        })
    } catch (error) {
        console.log("ERROR - Ocurrió un error en el login(), de la capa controller")
        return res.status(500).send("ERROR - Ocurrió un error interno en el servidor")
    }
}

exports.register = async (req, res) => {
    try {
        const {nombre, password, email} = req.body 
        const user = await authService.register(nombre, password, email)
        if (!user) {
            return res.status(400).send("Hubo un error en el registro")
        }
        return res.status(201).send("Usuario creado de forma correcta y espectacularmente genial!")
    } catch (error) {
        console.log("Error controller: metodo register")
        return res.status(500).send("ERROR - Ocurrió un error interno en el servidor")           
    }
}

exports.perfil = async (req, res) => {
    try {
        console.log("Usuario autorizado a perfil")
        return res.status(200).send("Acceso autorizado a perfil")
    } catch (error) {
        console.log("Error - No se pudo acceder a /perfil")
        return res.status(500).send("Error en el servidor")
    }
}

exports.logout = async (req, res) => {
    try {
        if (!req.session) {
            console.log("Sin sesiones activas")
            return res.status(404).send("No hay sesiones en este momento")
        } 
        req.session.destroy((err) => {
            if (err) {
                console.log(err)
            }
        }) 
        console.log("Sesion borrada")
        return res.status(200).send("Se ha deslogueado correctamente")

    } catch (error) {
        console.log("Error al logout")
        return res.status(500).send("Error en el servidor al desloguarse")
    }
}