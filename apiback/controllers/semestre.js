const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const NotFoundException = require("../exceptions/not-found-exception");
const {body, matchedData} = require("express-validator");
const {buildValidation} = require("../utils/validation");
const semestresRepository = require("../repositories/semestre").getInstance();

const anioValidation = () => body('anio')
    .isInt({min: 1_999, max: 2_050})
    .withMessage('Ingresa un Año válido (1999-2050)');

const esPrimerSemestreValidation = () => body('esPrimerSemestre')
    .isBoolean()
    .withMessage('El valor ingresado no es válido.');

module.exports.createValidation = buildValidation([anioValidation(), esPrimerSemestreValidation(),]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const semestre = await semestresRepository.createSemestre(validated.anio, validated.esPrimerSemestre);
    apiResponse.success(res, semestre, "Semestre creado.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await semestresRepository.listSemestres(parseInt(page) || 1, parseInt(pageSize) || 10, search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const semestre = await semestresRepository.findById(req.params.id);
    if (semestre === null) {
        throw new NotFoundException("El Semestre no existe.");
    }
    apiResponse.success(res, semestre);
});

module.exports.updateValidation = buildValidation([anioValidation(), esPrimerSemestreValidation(),]);
module.exports.update = asyncHandler(async function (req, res) {
    const semestre = await semestresRepository.findById(req.params.id);
    if (semestre === null) {
        throw new NotFoundException('El Semestre no existe.');
    }

    const validated = matchedData(req);
    const updated = {};
    if (semestre.anio !== validated.anio) {
        updated.anio = validated.anio;
    }
    if (semestre.esPrimerSemestre !== validated.esPrimerSemestre) {
        updated.esPrimerSemestre = validated.esPrimerSemestre;
    }

    const result = await semestresRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Semestre actualizado.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await semestresRepository.delete(req.params.id);
    apiResponse.success(res, null, "Semestre eliminado.");
});
