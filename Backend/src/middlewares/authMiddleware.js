const authMiddleware = (req, res, next) => {
    if (!(req.session && req.session.userId)) {
    return res.status(403).send("Acceso no autorizado")
    }
    next()
} 

module.exports = authMiddleware;


