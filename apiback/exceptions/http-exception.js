class HttpException extends Error {
    constructor(message = 'Error interno.', status = 500, error = null) {
        super(message);
        this.status = status;
        this.error = error;
    }
}

module.exports = HttpException;
