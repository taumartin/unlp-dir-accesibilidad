const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const NotFoundException = require("../exceptions/not-found-exception");
const {buildValidation} = require("../utils/validation");
const {body, matchedData} = require("express-validator");
const materiaRepository = require("../repositories/materia").getInstance();

const nombreValidation = () => body('nombre')
    .trim()
    .escape()
    .notEmpty()
    .isString()
    .withMessage('Ingresa un nombre válido.')
    .isLength({max: 100})
    .withMessage('El nombre no puede tener más de 100 caracteres.');

const docentesValidation = () => body('docentes')
    .trim()
    .escape()
    .optional({checkFalsy: true})
    .isString()
    .withMessage('Ingresa un valor válido.')
    .isLength({max: 500})
    .withMessage('El valor no puede tener más de 500 caracteres.');

const contactoValidation = () => body('contacto')
    .trim()
    .escape()
    .optional({checkFalsy: true})
    .isString()
    .withMessage('Ingresa un valor válido.')
    .isLength({max: 500})
    .withMessage('El valor no puede tener más de 500 caracteres.');

module.exports.createValidation = buildValidation([
    nombreValidation(),
    docentesValidation(),
    contactoValidation(),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const materia = await materiaRepository.createMateria(validated.nombre, validated.docentes, validated.contacto);
    apiResponse.success(res, materia, "Materia creada.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await materiaRepository.listMaterias(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const materia = await materiaRepository.findById(req.params.id);
    if (materia === null) {
        throw new NotFoundException("La Materia no existe.");
    }
    apiResponse.success(res, materia);
});

module.exports.updateValidation = buildValidation([
    nombreValidation(),
    docentesValidation(),
    contactoValidation(),
]);
module.exports.update = asyncHandler(async function (req, res) {
    const materia = await materiaRepository.findById(req.params.id);
    if (materia === null) {
        throw new NotFoundException('La Materia no existe.');
    }

    const validated = matchedData(req, {includeOptionals: true});
    const updated = {};
    if (materia.nombre !== validated.nombre) {
        updated.nombre = validated.nombre;
    }
    if (materia.docentes !== validated.docentes) {
        updated.docentes = validated.docentes;
    }
    if (materia.contacto !== validated.contacto) {
        updated.contacto = validated.contacto;
    }

    const result = await materiaRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Materia actualizada.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await materiaRepository.delete(req.params.id);
    apiResponse.success(res, null, "Materia eliminada.");
});
