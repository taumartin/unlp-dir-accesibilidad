const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const {matchedData, body} = require("express-validator");
const {buildValidation} = require("../utils/validation");
const NotFoundException = require("../exceptions/not-found-exception");
const ValidationException = require("../exceptions/validation-exception");
const semestreRepository = require("../repositories/semestre").getInstance();
const tutorRepository = require("../repositories/tutor").getInstance();
const materiaRepository = require("../repositories/materia").getInstance();
const ayudantiaRepository = require("../repositories/ayudantia").getInstance();

const semestreIdValidation = () => body('semestreId')
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Semestre válido.')
    .bail()
    .custom(async value => {
        const semestre = await semestreRepository.findById(value);
        if (semestre === null) {
            throw new Error('El ID de Semestre ingresado no existe.');
        }
    });

const tutorIdValidation = () => body('tutorId')
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Tutor válido.')
    .bail()
    .custom(async value => {
        const tutor = await tutorRepository.findById(value);
        if (tutor === null) {
            throw new Error('El ID de Tutor ingresado no existe.');
        }
    });

const materiaIdValidation = () => body('materiaId')
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Materia válido.')
    .bail()
    .custom(async value => {
        const alumno = await materiaRepository.findById(value);
        if (alumno === null) {
            throw new Error('El ID de Alumno ingresado no existe.');
        }
    });

module.exports.createValidation = buildValidation([
    semestreIdValidation(),
    tutorIdValidation(),
    materiaIdValidation(),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const ayudantia = await ayudantiaRepository.createApoyo(validated.semestreId, validated.tutorId, validated.materiaId);
    apiResponse.success(res, ayudantia, "Ayudantía creada.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await ayudantiaRepository.listAyudantias(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const ayudantia = await ayudantiaRepository.findById(req.params.id);
    if (ayudantia === null) {
        throw new NotFoundException("La Ayudantía no existe.");
    }
    apiResponse.success(res, ayudantia);
});

module.exports.updateValidation = buildValidation([
    semestreIdValidation(),
    tutorIdValidation(),
    materiaIdValidation(),
]);
module.exports.update = asyncHandler(async function (req, res) {
    const ayudantia = await ayudantiaRepository.findById(req.params.id);
    if (ayudantia === null) {
        throw new NotFoundException('La Ayudantia no existe.');
    }
    const validated = matchedData(req);
    const errors = {};
    const updated = {};
    const existeAyudantia = await ayudantiaRepository.findAyudantiaBySemestreTutorAndMateria(validated.semestreId,
        validated.tutorId, validated.materiaId);
    const ayudantiaIsNotUnique = (existeAyudantia !== null) && (existeAyudantia.id !== ayudantia.id);
    if (ayudantia.semestreId !== validated.semestreId) {
        updated.semestreId = validated.semestreId;
        if (ayudantiaIsNotUnique) {
            errors.semestreId = {
                type: 'field',
                msg: 'El ID de Semestre ingresado ya se encuentra asociado al Tutor y Materia.',
                path: 'semestreId',
                location: 'body',
            };
        }
    }
    if (ayudantia.tutorId !== validated.tutorId) {
        updated.tutorId = validated.tutorId;
        if (ayudantiaIsNotUnique) {
            errors.tutorId = {
                type: 'field',
                msg: 'El ID de Tutor ingresado ya se encuentra asociado al Semestre y Materia.',
                path: 'tutorId',
                location: 'body',
            };
        }
    }
    if (ayudantia.materiaId !== validated.materiaId) {
        updated.materiaId = validated.materiaId;
        if (ayudantiaIsNotUnique) {
            errors.materiaId = {
                type: 'field',
                msg: 'El ID de Materia ingresado ya se encuentra asociado al Semestre y Tutor.',
                path: 'materiaId',
                location: 'body',
            };
        }
    }
    if (errors.semestreId || errors.tutorId || errors.materiaId) {
        throw new ValidationException(errors);
    }
    const result = await ayudantiaRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Ayudantía actualizada.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await ayudantiaRepository.delete(req.params.id);
    apiResponse.success(res, null, "Ayudantía eliminada.");
});
