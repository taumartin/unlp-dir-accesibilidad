const HttpException = require("./http-exception");

class ValidationException extends HttpException {
    constructor(errors) {
        super('Errores de validación.', 400, errors);
    }
}

module.exports = ValidationException;
