const HttpException = require("./http-exception");

class NotFoundException extends HttpException {
    constructor(message = 'El recurso solicitado no pudo ser encontrado.') {
        super(message, 404);
    }
}

module.exports = NotFoundException;
