const HttpException = require("./http-exception");

class UnauthorizedException extends HttpException {
    constructor(message = 'Usuario no autenticado.') {
        super(message, 401);
    }
}

module.exports = UnauthorizedException;
