const jwt = require('jsonwebtoken');
const fs = require("fs-extra");
const path = require("path");
const UnauthorizedException = require("../exceptions/unauthorized-exception");
const ForbiddenException = require("../exceptions/forbidden-exception");

const SESSIONS_DIR = "./sessions";
const SESSIONS_DIR_MODE = 0o770;

const _getSessionPath = (id) => {
    return path.join(SESSIONS_DIR, `${id}.json`);
};

const _sessionExists = (id) => {
    return !!id && fs.pathExistsSync(_getSessionPath(id));
};

const _createSession = (id, sessionData) => {
    fs.writeJsonSync(_getSessionPath(id), sessionData);
};

const _deleteSession = (id) => {
    fs.removeSync(_getSessionPath(id));
};

const jwtSessionStorageInit = () => {
    fs.ensureDirSync(SESSIONS_DIR, SESSIONS_DIR_MODE);
};

const _getJwtPayloadFromUser = (user) => ({email: user.correo});

const jwtCreateAccessToken = (user) => {
    return jwt.sign(_getJwtPayloadFromUser(user), process.env.JWT_SECRET, {expiresIn: process.env.JWT_TOKEN_EXPIRES_IN});
};

const jwtCreateRefreshToken = (user) => {
    const refreshToken = jwt.sign(_getJwtPayloadFromUser(user), process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN});
    _createSession(refreshToken, _getJwtPayloadFromUser(user));
    return refreshToken;
};

const jwtVerifyToken = (token, callback) => {
    if (!token) {
        throw new UnauthorizedException('Acceso denegado (access token no encontrado).');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, userDecoded) => {
        if (err) {
            throw new ForbiddenException('Token inválido.', err);
        }
        if (callback) {
            callback(userDecoded);
        }
    });
};

const jwtVerifyRefreshToken = (refreshToken, callback) => {
    if (!_sessionExists(refreshToken)) {
        throw new ForbiddenException('Refresh Token inválido.');
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, userDecoded) => {
        if (err) {
            throw new ForbiddenException('Refresh Token inválido.', err);
        }
        if (callback) {
            callback(jwtCreateAccessToken({correo: userDecoded.email}));
        }
    });
};

const jwtClearRefreshToken = (refreshToken) => {
    if (!_sessionExists(refreshToken)) {
        throw new ForbiddenException('Refresh Token inválido.');
    }
    _deleteSession(refreshToken);
};

module.exports = {
    jwtSessionStorageInit: jwtSessionStorageInit,
    jwtCreateAccessToken: jwtCreateAccessToken,
    jwtCreateRefreshToken: jwtCreateRefreshToken,
    jwtVerifyToken: jwtVerifyToken,
    jwtVerifyRefreshToken: jwtVerifyRefreshToken,
    jwtClearRefreshToken: jwtClearRefreshToken,
};
