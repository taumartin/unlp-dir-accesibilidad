const {logger} = require("../config/logging");

let requestIdCounter = 0;
const MAX_ID = Number.MAX_SAFE_INTEGER;

const assignRequestId = (req, res, next) => {
    if (requestIdCounter >= MAX_ID) {
        logger.log("Reiniciando requestIdCounter...", req);
        requestIdCounter = 0;
    }
    req.id = (++requestIdCounter);
    next();
};
module.exports.assignRequestId = assignRequestId;
