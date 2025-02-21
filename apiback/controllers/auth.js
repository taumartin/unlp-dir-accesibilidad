const {body, matchedData} = require("express-validator");
const {verifyPassword, hashPassword} = require("../utils/hash");
const {
    jwtCreateAccessToken,
    jwtCreateRefreshToken,
    jwtVerifyRefreshToken,
    jwtClearRefreshToken
} = require("../config/jwt");
const {buildValidation} = require("../utils/validation");
const usuarioRepository = require("../repositories/usuario").getInstance();

const JWT_REFRESH_COOKIE = 'refreshToken';

module.exports.signupValidation = buildValidation([
    body('email')
        .isEmail()
        .escape()
        .withMessage('Ingresa un email válido.')
        .bail()
        .toLowerCase()
        .custom(async value => {
            const user = await usuarioRepository.findUsuarioByEmail(value);
            if (user !== null) {
                throw new Error('El email ingresado ya existe.');
            }
        }),
    body('password')
        .isLength({min: 6})
        .withMessage('La contraseña debe tener al menos 6 caracteres.'),
]);
module.exports.signup = async function (req, res) {
    const validated = matchedData(req);
    const username = validated.email;
    const password = await hashPassword(validated.password);
    const email = validated.email;
    const isAdmin = false;
    const isActive = false;
    const profilePhoto = null;
    await usuarioRepository.createUsuario(username, password, email, isAdmin, isActive, profilePhoto);
    res.status(200).send({message: 'Usuario registrado en estado inactivo. Contacta con el administrador para habilitar el login.'});
};

module.exports.loginValidation = buildValidation([
    body('email')
        .isEmail()
        .escape()
        .withMessage('Ingresa un email válido.')
        .toLowerCase(),
    body('password')
        .notEmpty()
        .withMessage('Ingresa una contraseña.'),
]);
module.exports.login = async function (req, res) {
    const validated = matchedData(req);
    const user = await usuarioRepository.findUsuarioByEmail(validated.email);
    if ((user === null) || !(await verifyPassword(validated.password, user.contrasenia))) {
        return res.status(401).send({message: 'Credenciales inválidas.'});
    }

    const accessToken = jwtCreateAccessToken(user);
    const refreshToken = jwtCreateRefreshToken(user);
    res.cookie(JWT_REFRESH_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.JWT_COOKIE_USE_HTTPS,
        sameSite: 'strict'
    });
    res.status(200).send({accessToken: accessToken});
};

module.exports.refresh = function (req, res) {
    jwtVerifyRefreshToken(req.cookies[JWT_REFRESH_COOKIE], (newAccessToken) => {
        res.status(200).json({accessToken: newAccessToken});
    });
};

module.exports.logout = function (req, res) {
    jwtClearRefreshToken(req.cookies[JWT_REFRESH_COOKIE]);
    res.clearCookie(JWT_REFRESH_COOKIE);
    res.status(200).json({message: 'Logout exitoso.'});
};

module.exports.me = (req, res) => {
    res.status(200).json(req.user);
    // TODO: agregar datos del usuario de BD (find by req.user.email), roles, permisos...
};
