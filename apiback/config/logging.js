const morgan = require("morgan");

const morganLogger = morgan('dev'); // FIXME: agregar logs productivos...
module.exports.logging = morganLogger;

const logger = {
    log: (message, req) => {
        const currentTime = new Date().toISOString();
        console.log(`${currentTime} ${req ? req.id : 0} ${message}`);
    },
    error: (message, error, req) => {
        const currentTime = new Date().toISOString();
        console.error(`${currentTime} ${req ? req.id : 0} ${message}`, error);
    }
};
module.exports.logger = logger;

const reqLogger = (req, res, next) => {
    req.log = (message) => {
        logger.log(message, req);
    }
    next();
};
module.exports.reqLogger = reqLogger;
