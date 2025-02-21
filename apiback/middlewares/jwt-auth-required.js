const {jwtVerifyToken} = require("../config/jwt");

const jwtAuthRequired = (req, res, next) => {
    jwtVerifyToken(req.headers.authorization?.split(' ')[1], (userDecoded) => {
        req.user = userDecoded;
        next();
    });
};

module.exports = jwtAuthRequired;
