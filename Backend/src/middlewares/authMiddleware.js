
exports.authMiddleware = (req, res, next) => {
    if (!(req.session && req.sessionId)) {
    return res(403).send("No está autorizado a acceder a esta parte (carita enojada)")
    }
    if (!req.body.email && !req.body.password) {
        return next()
    } else {
        return res(404).send("data no valida")
    }
} 


