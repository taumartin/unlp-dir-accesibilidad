const {jwtVerifyToken} = require("../config/jwt");

const jwtAuthRequired = (req, res, next) => {
    try {
        jwtVerifyToken(req.headers.authorization?.split(' ')[1], (userDecoded) => {
            req.user = userDecoded;
            next();
        });
    } catch (error) {
        next(error);
    }
};

module.exports = jwtAuthRequired;
