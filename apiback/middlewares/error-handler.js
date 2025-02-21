const HttpException = require("../exceptions/http-exception");

const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = {};

    if (req.app.get('env') === 'development') {
        console.error(err);
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
        message: 'Error inesperado.',
        status: 500,
    });
};

module.exports = errorHandler;
