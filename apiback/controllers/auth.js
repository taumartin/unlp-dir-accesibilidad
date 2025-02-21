const {body, validationResult, matchedData} = require("express-validator");
const {verifyPassword, hashPassword} = require("../utils/hash");
const {
    jwtCreateAccessToken,
    jwtCreateRefreshToken,
    jwtVerifyRefreshToken,
    jwtClearRefreshToken
} = require("../config/jwt");
const usuarioRepository = require("../repositories/usuario").getInstance();

const JWT_REFRESH_COOKIE = 'refreshToken';

module.exports.signupValidation = [
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
        .withMessage('La contraseña debe tener al menos 6 caracteres.')
];
module.exports.signup = async function (req, res) {
    const errors = validationResult(req); // TODO: pasar esto a un handler de validacion
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    const data = matchedData(req);
    const username = data.email;
    const password = await hashPassword(data.password);
    const email = data.email;
    const isAdmin = false;
    const isActive = false;
    const profilePhoto = null;
    await usuarioRepository.createUsuario(username, password, email, isAdmin, isActive, profilePhoto);
    res.status(200).send({message: 'Usuario registrado en estado inactivo. Contacta con el administrador para habilitar el login.'});
};

module.exports.loginValidation = [
    body('email')
        .isEmail()
        .escape()
        .withMessage('Ingresa un email válido.')
        .toLowerCase(),
    body('password')
        .notEmpty()
        .withMessage('Ingresa una contraseña.')
];
module.exports.login = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.mapped()});
    }

    const data = matchedData(req);
    const user = await usuarioRepository.findUsuarioByEmail(data.email);
    if ((user === null) || !(await verifyPassword(data.password, user.contrasenia))) {
        return res.status(401).send({message: 'Credenciales inválidas.'});
    }

    const accessToken = jwtCreateAccessToken(user);
    const refreshToken = jwtCreateRefreshToken(user);
    res.cookie(JWT_REFRESH_COOKIE, refreshToken, {
        httpOnly: true,
        secure: false, // FIXME: cambiar a TRUE en prod.
        sameSite: 'Strict'
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
    res.status(200).json(req.user); // TODO: agregar datos del usuario de BD (find by req.user.email), roles, permisos...
};
