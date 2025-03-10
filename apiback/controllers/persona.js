const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const {matchedData, body} = require("express-validator");
const {buildValidation} = require("../utils/validation");
const NotFoundException = require("../exceptions/not-found-exception");
const ValidationException = require("../exceptions/validation-exception");
const personaRepository = require("../repositories/persona").getInstance();

const nombreValidation = () => body('nombre')
    .trim()
    .escape()
    .notEmpty()
    .isAlpha('es-ES', {ignore: [" "]})
    .withMessage('Ingresa un nombre válido.')
    .isLength({max: 100})
    .withMessage('El nombre no puede tener más de 100 caracteres.');

const apellidoValidation = () => body('apellido')
    .trim()
    .escape()
    .notEmpty()
    .isAlpha('es-ES', {ignore: [" "]})
    .withMessage('Ingresa un apellido válido.')
    .isLength({max: 100})
    .withMessage('El apellido no puede tener más de 100 caracteres.');

const dniValidation = () => body('dni')
    .isInt({min: 10_000_000, max: 99_999_999})
    .withMessage('Ingresa un DNI válido.');

const telefonoValidation = () => body('telefono')
    .trim()
    .escape()
    .optional({checkFalsy: true})
    .isString()
    .withMessage('Ingresa un teléfono válido.')
    .isLength({min: 6, max: 25})
    .withMessage('El teléfono debe tener entre 6 y 25 caracteres.');

const emailValidation = () => body('email')
    .trim()
    .isEmail()
    .withMessage('Ingresa un e-mail válido.')
    .bail()
    .normalizeEmail()
    .isLength({max: 100})
    .withMessage('El e-mail no puede tener más de 100 caracteres.');

module.exports.createValidation = buildValidation([
    nombreValidation(),
    apellidoValidation(),
    dniValidation()
        .bail()
        .custom(async value => {
            const persona = await personaRepository.findPersonaByDni(value);
            if (persona !== null) {
                throw new Error('El DNI ingresado ya existe.');
            }
        }),
    telefonoValidation(),
    emailValidation()
        .bail()
        .custom(async value => {
            const persona = await personaRepository.findPersonaByEmail(value);
            if (persona !== null) {
                throw new Error('El e-mail ingresado ya existe.');
            }
        }),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const persona = await personaRepository.createPersona(validated.nombre, validated.apellido, validated.dni,
        validated.telefono, validated.email);
    apiResponse.success(res, persona, "Persona creada.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await personaRepository.listPersonas(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const persona = await personaRepository.findById(req.params.id);
    if (persona === null) {
        throw new NotFoundException("La Persona no existe.");
    }
    apiResponse.success(res, persona);
});

module.exports.updateValidation = buildValidation([
    nombreValidation(),
    apellidoValidation(),
    dniValidation(),
    telefonoValidation(),
    emailValidation(),
]);
module.exports.update = asyncHandler(async function (req, res) {
    const persona = await personaRepository.findById(req.params.id);
    if (persona === null) {
        throw new NotFoundException('La persona no existe.');
    }

    const validated = matchedData(req, {includeOptionals: true});
    const errors = {};
    const updated = {};
    if (persona.dni !== validated.dni) {
        updated.dni = validated.dni;
        const existePersonaDni = await personaRepository.findPersonaByDni(validated.dni);
        if ((existePersonaDni !== null) && (existePersonaDni.id !== persona.id)) {
            errors.dni = {
                type: 'field',
                msg: 'El DNI ingresado ya existe.',
                path: 'dni',
                location: 'body',
            };
        }
    }
    if (persona.email !== validated.email) {
        updated.email = validated.email;
        const existePersonaEmail = await personaRepository.findPersonaByEmail(validated.email);
        if ((existePersonaEmail !== null) && (existePersonaEmail.id !== persona.id)) {
            errors.email = {
                type: 'field',
                msg: 'El e-mail ingresado ya existe.',
                path: 'email',
                location: 'body',
            };
        }
    }
    if (errors.dni || errors.email) {
        throw new ValidationException(errors);
    }

    if (persona.nombre !== validated.nombre) {
        updated.nombre = validated.nombre;
    }
    if (persona.apellido !== validated.apellido) {
        updated.apellido = validated.apellido;
    }
    if (persona.telefono !== validated.telefono) {
        updated.telefono = validated.telefono;
    }
    const result = await personaRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Persona actualizada.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await personaRepository.delete(req.params.id);
    apiResponse.success(res, null, "Persona eliminada.");
});
