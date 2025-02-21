const HttpException = require("../exceptions/http-exception");
const {logger} = require("../config/logging");

const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message || 'Error';
    res.locals.error = {};

    if (req.app.get('env') === 'development') {
        logger.error(`Handling error: ${err.message}`, err, req);
        res.locals.error = err.error || {};
    }

    if (err instanceof HttpException) {
        return res.status(err.status).json({
            status: err.status,
            message: res.locals.message,
            error: res.locals.error,
        });
    }

    res.status(500).json({
        status: 500,
        message: 'Error inesperado.',
        error: res.locals.error,
    });
};

module.exports = errorHandler;
