const HttpException = require("./http-exception");

class ForbiddenException extends HttpException {
    constructor(message = 'Operación no permitida.', error = null) {
        super(message, 403, error);
    }
}

module.exports = ForbiddenException;
