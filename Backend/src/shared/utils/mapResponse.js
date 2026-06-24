exports.mapResponse = (errorInput) => {
    // 1. Extraemos el código de error sin importar si nos pasaron un String o un Objeto
    const code = (errorInput && typeof errorInput === 'object') 
        ? errorInput.code 
        : errorInput;

    // 2. Evaluamos el código de forma segura
    switch(code) {
        case 'INVALID_CREDENTIALS':
        case 'USER_NOT_ACTIVE':
        case 'LOGIN_FAILED':
        case 'SESION_EXPIRED':
            return { statusCode: 401 };

        case 'NOT_AUTHORIZED':
            return { statusCode: 403 };

        case 'USER_NOT_FOUND':
            return { statusCode: 404 };

        case 'USER_ALREADY_EXISTS':
        case 'REGISTER_FAILED':
            return { statusCode: 400 };

        case 'INTERNAL_ERROR':
        default:
            return { statusCode: 500 };
    }
};