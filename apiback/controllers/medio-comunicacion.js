const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const NotFoundException = require("../exceptions/not-found-exception");
const {buildValidation} = require("../utils/validation");
const {body, matchedData} = require("express-validator");
const medioDeComunicacionRepository = require("../repositories/medio-comunicacion").getInstance();

const nombreValidation = () => body('nombre')
    .trim()
    .escape()
    .notEmpty()
    .isString()
    .withMessage('Ingresa un nombre válido.')
    .isLength({max: 40})
    .withMessage('El nombre no puede tener más de 40 caracteres.');

module.exports.createValidation = buildValidation([
    nombreValidation(),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const medioComunicacion = await medioDeComunicacionRepository.createMedioDeComunicacion(validated.nombre);
    apiResponse.success(res, medioComunicacion, "Medio de Comunicación creado.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await medioDeComunicacionRepository.listMediosDeComunicacion(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const medioComunicacion = await medioDeComunicacionRepository.findById(req.params.id);
    if (medioComunicacion === null) {
        throw new NotFoundException("El Medio de Comunicación no existe.");
    }
    apiResponse.success(res, medioComunicacion);
});

module.exports.updateValidation = buildValidation([
    nombreValidation(),
]);
module.exports.update = asyncHandler(async function (req, res) {
    const medioComunicacion = await medioDeComunicacionRepository.findById(req.params.id);
    if (medioComunicacion === null) {
        throw new NotFoundException('El Medio de Comunicación no existe.');
    }

    const validated = matchedData(req);
    const updated = {};
    if (medioComunicacion.nombre !== validated.nombre) {
        updated.nombre = validated.nombre;
    }

    const result = await medioDeComunicacionRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Medio de Comunicación actualizado.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await medioDeComunicacionRepository.delete(req.params.id);
    apiResponse.success(res, null, "Medio de Comunicación eliminado.");
});
