const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const {matchedData, body} = require("express-validator");
const {buildValidation} = require("../utils/validation");
const NotFoundException = require("../exceptions/not-found-exception");
const ValidationException = require("../exceptions/validation-exception");
const semestreRepository = require("../repositories/semestre").getInstance();
const tutorRepository = require("../repositories/tutor").getInstance();
const alumnoRepository = require("../repositories/alumno").getInstance();
const apoyoRepository = require("../repositories/apoyo").getInstance();

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

const alumnoIdValidation = () => body('alumnoId')
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Alumno válido.')
    .bail()
    .custom(async value => {
        const alumno = await alumnoRepository.findById(value);
        if (alumno === null) {
            throw new Error('El ID de Alumno ingresado no existe.');
        }
    });

module.exports.createValidation = buildValidation([
    semestreIdValidation(),
    tutorIdValidation(),
    alumnoIdValidation(),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const alumno = await apoyoRepository.createApoyo(validated.semestreId, validated.tutorId, validated.alumnoId);
    apiResponse.success(res, alumno, "Apoyo creado.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await apoyoRepository.listApoyos(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const apoyo = await apoyoRepository.findById(req.params.id);
    if (apoyo === null) {
        throw new NotFoundException("El Apoyo no existe.");
    }
    apiResponse.success(res, apoyo);
});

module.exports.updateValidation = buildValidation([
    semestreIdValidation(),
    tutorIdValidation(),
    alumnoIdValidation(),
]);
module.exports.update = asyncHandler(async function (req, res) {
    const apoyo = await apoyoRepository.findById(req.params.id);
    if (apoyo === null) {
        throw new NotFoundException('El Apoyo no existe.');
    }
    const validated = matchedData(req);
    const errors = {};
    const updated = {};
    const existeApoyo = await apoyoRepository.findApoyoBySemestreTutorAndAlumno(validated.semestreId, validated.tutorId, validated.alumnoId);
    const apoyoIsNotUnique = (existeApoyo !== null) && (existeApoyo.id !== apoyo.id);
    if (apoyo.semestreId !== validated.semestreId) {
        updated.semestreId = validated.semestreId;
        if (apoyoIsNotUnique) {
            errors.semestreId = {
                type: 'field',
                msg: 'El ID de Semestre ingresado ya se encuentra asociado al Tutor y Alumno.',
                path: 'semestreId',
                location: 'body',
            };
        }
    }
    if (apoyo.tutorId !== validated.tutorId) {
        updated.tutorId = validated.tutorId;
        if (apoyoIsNotUnique) {
            errors.tutorId = {
                type: 'field',
                msg: 'El ID de Tutor ingresado ya se encuentra asociado al Semestre y Alumno.',
                path: 'tutorId',
                location: 'body',
            };
        }
    }
    if (apoyo.alumnoId !== validated.alumnoId) {
        updated.alumnoId = validated.alumnoId;
        if (apoyoIsNotUnique) {
            errors.alumnoId = {
                type: 'field',
                msg: 'El ID de Alumno ingresado ya se encuentra asociado al Semestre y Tutor.',
                path: 'alumnoId',
                location: 'body',
            };
        }
    }
    if (errors.semestreId || errors.tutorId || errors.alumnoId) {
        throw new ValidationException(errors);
    }
    const result = await apoyoRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Apoyo actualizado.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await apoyoRepository.delete(req.params.id);
    apiResponse.success(res, null, "Apoyo eliminado.");
});
