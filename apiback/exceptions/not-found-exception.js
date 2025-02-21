const HttpException = require("./http-exception");

class NotFoundException extends HttpException {
    constructor() {
        super('El recurso solicitado no pudo ser encontrado.', 404);
    }
}

module.exports = NotFoundException;
