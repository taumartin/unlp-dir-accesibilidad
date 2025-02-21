const {logger} = require("../config/logging");
const ValidationException = require("../exceptions/validation-exception");
const apiResponse = require("../utils/api-response");

const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message || 'Error inesperado.';
    res.locals.error = {};

    if (req.app.get('env') === 'development') {
        logger.error(`Handling error: ${err.message}`, err, req);
        res.locals.error = err.error || {};
    }

    apiResponse.error(res, res.locals.error, res.locals.message, err.status);
};

module.exports = errorHandler;
