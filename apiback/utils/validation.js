const validateInputs = require("../middlewares/validate-inputs");

module.exports = {
    buildValidation(validators) {
        return [...validators, validateInputs];
    }
};
