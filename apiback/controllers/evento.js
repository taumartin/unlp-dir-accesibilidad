const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const NotFoundException = require("../exceptions/not-found-exception");
const {buildValidation} = require("../utils/validation");
const {body, matchedData} = require("express-validator");
const eventoRepository = require("../repositories/evento").getInstance();

const fechaYHoraValidation = () => body('fechaYHora')
    .isDate()
    .withMessage('El valor ingresado no es válido.');

const descripcionValidation = () => body('descripcion')
    .trim()
    .escape()
    .optional({checkFalsy: true})
    .isLength({max: 5_000})
    .withMessage('La descripción no puede tener más de 5.000 caracteres.');

module.exports.createValidation = buildValidation([
    fechaYHoraValidation(),
    descripcionValidation(),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const evento = await eventoRepository.createEvento(validated.fechaYHora, validated.descripcion);
    apiResponse.success(res, evento, "Evento creado.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await eventoRepository.listEventos(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const evento = await eventoRepository.findById(req.params.id);
    if (evento === null) {
        throw new NotFoundException("El Evento no existe.");
    }
    apiResponse.success(res, evento);
});

module.exports.updateValidation = buildValidation([
    fechaYHoraValidation(),
    descripcionValidation(),
]);
module.exports.update = asyncHandler(async function (req, res) {
    const evento = await eventoRepository.findById(req.params.id);
    if (evento === null) {
        throw new NotFoundException('El Evento no existe.');
    }

    const validated = matchedData(req,{ includeOptionals: true });
    const updated = {};
    if (evento.fechaYHora !== validated.fechaYHora) {
        updated.fechaYHora = validated.fechaYHora;
    }
    if (evento.descripcion !== validated.descripcion) {
        updated.descripcion = validated.descripcion;
    }

    const result = await eventoRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Evento actualizado.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await eventoRepository.delete(req.params.id);
    apiResponse.success(res, null, "Evento eliminado.");
});
