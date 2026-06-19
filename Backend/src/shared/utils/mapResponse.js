exports.mapResponse = (errorMessage) => {
    switch(errorMessage.code) {
        case 'INVALID_CREDENTIALS':
            return {
                statusCode: 401,
            }
        case 'USER_NOT_ACTIVE':
            return {
                statusCode: 401,
            }
        case 'INTERNAL_ERROR':
            return {
                statusCode: 500,
            }
        case 'USER_ALREADY_EXISTS':
            return {
                statusCode: 400,
            }
        case 'LOGIN_FAILED':
            return {
                statusCode: 401,
            }
        case 'REGISTER_FAILED':
           return {
                statusCode: 400,
            }
        case 'NOT_AUTHORIZED':
            return {
                statusCode: 403,
            }
        case 'SESION_EXPIRED':
            return {
                statusCode: 401,
            }
        case 'USER_NOT_FOUND':
            return {
                statusCode: 404,
            }
        default:
            return {
                statusCode: 500,
            }
    }
}
