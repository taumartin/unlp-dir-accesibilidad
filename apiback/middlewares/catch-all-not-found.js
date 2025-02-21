const NotFoundException = require("../exceptions/not-found-exception");

const catchAllNotFound = (err, req, res, next) => {
    next(new NotFoundException());
};

module.exports = catchAllNotFound;
