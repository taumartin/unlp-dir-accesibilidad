const {body, matchedData} = require("express-validator");
const {verifyPassword, hashPassword} = require("../utils/hash");
const {
    jwtCreateAccessToken,
    jwtCreateRefreshToken,
    jwtVerifyRefreshToken,
    jwtClearRefreshToken
} = require("../config/jwt");
const {buildValidation} = require("../utils/validation");
const UnauthorizedException = require("../exceptions/unauthorized-exception");
const {asyncHandler} = require("../utils/async-handler");
const apiResponse = require("../utils/api-response");
const NotFoundException = require("../exceptions/not-found-exception");
const usuarioRepository = require("../repositories/usuario").getInstance();

const JWT_REFRESH_COOKIE = 'refreshToken';

module.exports.signupValidation = buildValidation([
    body('email')
        .trim()
        .isEmail()
        .withMessage('Ingresa un email válido.')
        .bail()
        .normalizeEmail()
        .isLength({max: 100})
        .withMessage('El email no puede tener más de 100 caracteres.')
        .bail()
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
module.exports.signup = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    let baseUsername = validated.email.split('@')[0].slice(0, 32);
    let username = baseUsername;
    let counter = 1;

    // Verificar si el username ya existe y agregar un número hasta encontrar uno único.
    while (await usuarioRepository.findUsuarioByUsername(username)) {
        const suffix = counter.toString();
        const maxBaseLength = 32 - suffix.length;
        username = baseUsername.slice(0, maxBaseLength) + suffix;
        counter++;
    }

    const password = await hashPassword(validated.password);
    const email = validated.email;
    const isAdmin = false;
    const isActive = false;
    const profilePhoto = null;

    await usuarioRepository.createUsuario(username, password, email, isAdmin, isActive, profilePhoto);
    apiResponse.success(res, null,
        'Usuario registrado en estado inactivo. Contacta con el administrador para habilitar el login.');
});

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
module.exports.login = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const user = await usuarioRepository.findUsuarioByEmail(validated.email);
    // TODO: verificar que el usuario no este inactivo.
    if ((user === null) || !(await verifyPassword(validated.password, user.contrasenia))) {
        throw new UnauthorizedException('Credenciales inválidas.');
    }

    const accessToken = jwtCreateAccessToken(user);
    const refreshToken = jwtCreateRefreshToken(user);
    res.cookie(JWT_REFRESH_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.JWT_COOKIE_USE_HTTPS,
        sameSite: 'strict'
    });
    apiResponse.success(res, {accessToken: accessToken}, 'Login exitoso.');
});

module.exports.refresh = function (req, res) {
    jwtVerifyRefreshToken(req.cookies[JWT_REFRESH_COOKIE], (newAccessToken) => {
        apiResponse.success(res, {accessToken: newAccessToken});
    });
};

module.exports.logout = function (req, res) {
    jwtClearRefreshToken(req.cookies[JWT_REFRESH_COOKIE]);
    res.clearCookie(JWT_REFRESH_COOKIE);
    apiResponse.success(res, null, 'Logout exitoso.');
};

module.exports.me = asyncHandler(async (req, res) => {
    const user = await usuarioRepository.findUsuarioByEmail(req.user.email);
    if (!user) {
        throw new NotFoundException('Usuario no encontrado.');
    }
    apiResponse.success(res, {
        displayName: user.nombre || user.correo,
        profilePhoto: user.fotoDePerfil,
    });
    // TODO: agregar roles, permisos...
});
