const {validationResult} = require("express-validator");
const ValidationException = require("../exceptions/validation-exception");

const validateInputs = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ValidationException(errors.mapped()));
    }
    next();
};

module.exports = validateInputs;
