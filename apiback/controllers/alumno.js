const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const {matchedData, body} = require("express-validator");
const {buildValidation} = require("../utils/validation");
const NotFoundException = require("../exceptions/not-found-exception");
const ValidationException = require("../exceptions/validation-exception");
const personaRepository = require("../repositories/persona").getInstance();
const alumnoRepository = require("../repositories/alumno").getInstance();

const personaIdValidation = () => body('personaId')
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Persona válido.')
    .bail()
    .custom(async value => {
        const persona = await personaRepository.findById(value);
        if (persona === null) {
            throw new Error('El ID de Persona ingresado no existe.');
        }
    });

const legajoValidation = () => body('legajo')
    .trim()
    .notEmpty()
    .matches(/^\d{4,6}\/\d$/)
    .isLength({max: 10})
    .withMessage('El formato es inválido (######/#).');

const tieneCertificadoValidation = () => body('tieneCertificado')
    .isBoolean()
    .withMessage('El valor ingresado no es válido.');

const situacionValidation = () => body('situacion')
    .trim()
    .escape()
    .optional({checkFalsy: true})
    .isLength({max: 5_000})
    .withMessage('La situación no puede tener más de 5.000 caracteres.');

module.exports.createValidation = buildValidation([
    personaIdValidation(),
    legajoValidation(),
    tieneCertificadoValidation(),
    situacionValidation(),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const alumno = await alumnoRepository.createAlumno(validated.personaId, validated.legajo, validated.tieneCertificado,
        validated.situacion);
    apiResponse.success(res, alumno, "Alumno creado.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await alumnoRepository.listAlumnos(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const alumno = await alumnoRepository.findById(req.params.id);
    if (alumno === null) {
        throw new NotFoundException("El Alumno no existe.");
    }
    apiResponse.success(res, alumno);
});

module.exports.updateValidation = buildValidation([
    personaIdValidation(),
    legajoValidation(),
    tieneCertificadoValidation(),
    situacionValidation(),
]);
module.exports.update = asyncHandler(async function (req, res) {
    const alumno = await alumnoRepository.findById(req.params.id);
    if (alumno === null) {
        throw new NotFoundException('El Alumno no existe.');
    }

    const validated = matchedData(req);
    const errors = {};
    const updated = {};
    if (alumno.personaId !== validated.personaId) {
        updated.personaId = validated.personaId;
        const existeAlumnoPersona = await alumnoRepository.findAlumnoByPersonaId(validated.personaId);
        if ((existeAlumnoPersona !== null) && (existeAlumnoPersona.id !== alumno.id)) {
            errors.personaId = {
                type: 'field',
                msg: 'El ID de Persona ingresado ya se encuentra asociado a un Alumno.',
                path: 'personaId',
                location: 'body',
            };
        }
    }
    if (alumno.legajo !== validated.legajo) {
        updated.legajo = validated.legajo;
        const existeAlumnoLegajo = await alumnoRepository.findAlumnoByLegajo(validated.legajo);
        if ((existeAlumnoLegajo !== null) && (existeAlumnoLegajo.id !== alumno.id)) {
            errors.dni = {
                type: 'field',
                msg: 'El Legajo ingresado ya existe.',
                path: 'legajo',
                location: 'body',
            };
        }
    }
    if (errors.personaId || errors.legajo) {
        throw new ValidationException(errors);
    }
    if (alumno.tieneCertificado !== validated.tieneCertificado) {
        updated.tieneCertificado = validated.tieneCertificado;
    }
    if (alumno.situacion !== validated.situacion) {
        updated.situacion = validated.situacion;
    }
    const result = await alumnoRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Alumno actualizado.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await alumnoRepository.delete(req.params.id);
    apiResponse.success(res, null, "Alumno eliminado.");
});
