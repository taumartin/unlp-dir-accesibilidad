const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const {matchedData, body} = require("express-validator");
const {buildValidation} = require("../utils/validation");
const NotFoundException = require("../exceptions/not-found-exception");
const personaRepository = require("../repositories/persona").getInstance();

module.exports.createValidation = buildValidation([
    body('nombre')
        .trim()
        .escape()
        .notEmpty()
        .isAlpha('es-ES')
        .withMessage('Ingresa un nombre válido.')
        .isLength({max: 100})
        .withMessage('El nombre no puede tener más de 100 caracteres.'),
    body('apellido')
        .trim()
        .escape()
        .notEmpty()
        .isAlpha('es-ES')
        .withMessage('Ingresa un apellido válido.')
        .isLength({max: 100})
        .withMessage('El apellido no puede tener más de 100 caracteres.'),
    body('dni')
        .isInt({min: 10_000_000, max: 99_999_999})
        .withMessage('Ingresa un DNI válido.')
        .bail()
        .custom(async value => {
            const persona = await personaRepository.findPersonaByDni(value);
            if (persona !== null) {
                throw new Error('El DNI ingresado ya existe.');
            }
        }),
    body('telefono')
        .trim()
        .escape()
        .optional({checkFalsy: true})
        .isMobilePhone('es-AR')
        .withMessage('Ingresa un teléfono válido.')
        .isLength({min: 6, max: 25})
        .withMessage('El teléfono debe tener entre 6 y 25 caracteres'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Ingresa un e-mail válido.')
        .bail()
        .normalizeEmail()
        .isLength({max: 100})
        .withMessage('El e-mail no puede tener más de 100 caracteres.')
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

module.exports.findById = function (req, res) {
    return personaRepository.findById(req.params.id)
        .then(persona => res.status((persona === null) ? 404 : 200).send(persona))
        .catch(error => res.status(400).send(error));
};

module.exports.update = function (req, res) {
    return personaRepository.update(req.params.id, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        telefono: req.body.telefono,
        email: req.body.email,
    })
        .then(persona => res.status((persona === null) ? 404 : 200).send(persona))
        .catch(error => res.status(400).send(error));
}

module.exports.delete = function (req, res) {
    return personaRepository.delete(req.params.id)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error));
}
