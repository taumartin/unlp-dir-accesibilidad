const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const NotFoundException = require("../exceptions/not-found-exception");
const {buildValidation} = require("../utils/validation");
const {body, matchedData} = require("express-validator");
const tiposDeEventosRepository = require("../repositories/tipo-evento").getInstance();

const nombreValidation = () => body('nombre')
    .trim()
    .escape()
    .notEmpty()
    .isString()
    .withMessage('Ingresa un nombre válido.')
    .isLength({max: 17})
    .withMessage('El nombre no puede tener más de 17 caracteres.');

module.exports.createValidation = buildValidation([
    nombreValidation(),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const tipoEvento = await tiposDeEventosRepository.createTipoDeEvento(validated.nombre);
    apiResponse.success(res, tipoEvento, "Tipo de Evento creado.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await tiposDeEventosRepository.listTiposDeEventos(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const tipoEvento = await tiposDeEventosRepository.findById(req.params.id);
    if (tipoEvento === null) {
        throw new NotFoundException("El Tipo de Evento no existe.");
    }
    apiResponse.success(res, tipoEvento);
});

module.exports.updateValidation = buildValidation([
    nombreValidation(),
]);
module.exports.update = asyncHandler(async function (req, res) {
    const tipoEvento = await tiposDeEventosRepository.findById(req.params.id);
    if (tipoEvento === null) {
        throw new NotFoundException('El Tipo de Evento no existe.');
    }

    const validated = matchedData(req);
    const updated = {};
    if (tipoEvento.nombre !== validated.nombre) {
        updated.nombre = validated.nombre;
    }

    const result = await tiposDeEventosRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Tipo de Evento actualizado.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await tiposDeEventosRepository.delete(req.params.id);
    apiResponse.success(res, null, "Tipo de Evento eliminado.");
});
