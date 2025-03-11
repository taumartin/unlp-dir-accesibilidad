const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const NotFoundException = require("../exceptions/not-found-exception");
const {buildValidation} = require("../utils/validation");
const {body, matchedData} = require("express-validator");
const ValidationException = require("../exceptions/validation-exception");
const {hashPassword} = require("../utils/hash");
const usuarioRepository = require("../repositories/usuario").getInstance();

const usernameValidation = () => body('username')
    .trim()
    .escape()
    .notEmpty()
    .isString()
    .withMessage('Ingresa un nombre de usuario válido.')
    .isLength({max: 32})
    .withMessage('El nombre de usuario no puede tener más de 32 caracteres.');

const estaActivoValidation = () => body('estaActivo')
    .optional({checkFalsy: true})
    .isBoolean()
    .withMessage('El valor ingresado no es válido.');

const contraseniaValidation = (optional = false) => {
    let validation = body('contrasenia');
    if (optional) {
        validation = validation.optional({checkFalsy: true});
    }
    return validation
        .isLength({min: 6, max: 255})
        .withMessage('La contraseña debe tener entre 6 y 255 caracteres.')
};

const correoValidation = () => body('correo')
    .trim()
    .isEmail()
    .withMessage('Ingresa un email válido.')
    .bail()
    .normalizeEmail()
    .isLength({max: 100})
    .withMessage('El email no puede tener más de 100 caracteres.');

const esAdminValidation = () => body('esAdmin')
    .optional({checkFalsy: true})
    .isBoolean()
    .withMessage('El valor ingresado no es válido.');

const fotoPerfilValidation = () => body('fotoPerfil')
    .trim()
    .escape()
    .optional({checkFalsy: true})
    .isURL()
    .withMessage('Ingresa una URL válida.')
    .bail()
    .isLength({max: 255})
    .withMessage('La URL no puede tener más de 255 caracteres.');

module.exports.createValidation = buildValidation([
    usernameValidation()
        .bail()
        .custom(async value => {
            const usuario = await usuarioRepository.findUsuarioByUsername(value);
            if (usuario !== null) {
                throw new Error('El nombre de usuario ingresado ya existe.');
            }
        }),
    estaActivoValidation(),
    contraseniaValidation(),
    correoValidation()
        .bail()
        .custom(async value => {
            const usuario = await usuarioRepository.findUsuarioByEmail(value);
            if (usuario !== null) {
                throw new Error('El e-mail ingresado ya existe.');
            }
        }),
    esAdminValidation(),
    fotoPerfilValidation(),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req, {includeOptionals: true});
    const usuario = await usuarioRepository.createUsuario(validated.username, validated.contrasenia, validated.correo,
        validated.esAdmin, validated.estaActivo, validated.fotoPerfil);
    apiResponse.success(res, usuario, "Usuario creado.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await usuarioRepository.listUsuarios(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const usuario = await usuarioRepository.findByIdWithoutPassword(req.params.id);
    if (usuario === null) {
        throw new NotFoundException("El Usuario no existe.");
    }
    apiResponse.success(res, usuario);
});

module.exports.updateValidation = buildValidation([
    usernameValidation(),
    estaActivoValidation(),
    contraseniaValidation(true),
    correoValidation(),
    esAdminValidation(),
    fotoPerfilValidation(),
]);
module.exports.update = asyncHandler(async (req, res) => {
    const usuario = await usuarioRepository.findById(req.params.id);
    if (usuario === null) {
        throw new NotFoundException('El Usuario no existe.');
    }

    const validated = matchedData(req, {includeOptionals: true});
    const errors = {};
    const updated = {};
    if (usuario.username !== validated.username) {
        updated.username = validated.username;
        const existeUsuarioUsername = await usuarioRepository.findUsuarioByUsername(validated.username);
        if ((existeUsuarioUsername !== null) && (existeUsuarioUsername.id !== usuario.id)) {
            errors.username = {
                type: 'field',
                msg: 'El nombre de usuario ingresado ya existe.',
                path: 'username',
                location: 'body',
            };
        }
    }
    if (usuario.correo !== validated.correo) {
        updated.correo = validated.correo;
        const existeUsuarioEmail = await usuarioRepository.findUsuarioByEmail(validated.correo);
        if ((existeUsuarioEmail !== null) && (existeUsuarioEmail.id !== usuario.id)) {
            errors.correo = {
                type: 'field',
                msg: 'El e-mail ingresado ya existe.',
                path: 'correo',
                location: 'body',
            };
        }
    }
    if (errors.username || errors.correo) {
        throw new ValidationException(errors);
    }

    if (validated.contrasenia) {
        const password = await hashPassword(validated.contrasenia);
        if (usuario.contrasenia !== password) {
            updated.contrasenia = password;
        }
    }
    if (usuario.tipo !== validated.tipo) {
        updated.tipo = validated.tipo;
    }
    if (usuario.estaActivo !== validated.estaActivo) {
        updated.estaActivo = validated.estaActivo;
    }
    if (usuario.fotoPerfil !== validated.fotoPerfil) {
        updated.fotoPerfil = validated.fotoPerfil;
    }

    const result = await usuarioRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Usuario actualizado.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await usuarioRepository.delete(req.params.id);
    apiResponse.success(res, null, "Usuario eliminado.");
});
