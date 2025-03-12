const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const {matchedData, body} = require("express-validator");
const {buildValidation} = require("../utils/validation");
const NotFoundException = require("../exceptions/not-found-exception");
const ValidationException = require("../exceptions/validation-exception");
const personaRepository = require("../repositories/persona").getInstance();
const usuarioRepository = require("../repositories/usuario").getInstance();
const tutorRepository = require("../repositories/tutor").getInstance();

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

const usuarioIdValidation = () => body('usuarioId')
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Usuario válido.')
    .bail()
    .custom(async value => {
        const usuario = await usuarioRepository.findById(value);
        if (usuario === null) {
            throw new Error('El ID de Usuario ingresado no existe.');
        }
    });

const horasAsignadasValidation = () => body('horasAsignadas')
    .isInt({min: 1, max: 8})
    .withMessage('Ingresa una cantidad válida (1-8).');

module.exports.createValidation = buildValidation([
    personaIdValidation(),
    usuarioIdValidation(),
    horasAsignadasValidation(),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const tutor = await tutorRepository.createTutor(validated.personaId, validated.usuarioId, validated.horasAsignadas);
    apiResponse.success(res, tutor, "Tutor creado.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await tutorRepository.listTutores(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const tutor = await tutorRepository.findById(req.params.id);
    if (tutor === null) {
        throw new NotFoundException("El Tutor no existe.");
    }
    apiResponse.success(res, tutor);
});

module.exports.updateValidation = buildValidation([
    personaIdValidation(),
    usuarioIdValidation(),
    horasAsignadasValidation(),
]);
module.exports.update = asyncHandler(async function (req, res) {
    const tutor = await tutorRepository.findById(req.params.id);
    if (tutor === null) {
        throw new NotFoundException('El Tutor no existe.');
    }

    const validated = matchedData(req);
    const errors = {};
    const updated = {};
    if (tutor.personaId !== validated.personaId) {
        updated.personaId = validated.personaId;
        const existeTutorPersona = await tutorRepository.findTutorByPersonaId(validated.personaId);
        if ((existeTutorPersona !== null) && (existeTutorPersona.id !== tutor.id)) {
            errors.personaId = {
                type: 'field',
                msg: 'El ID de Persona ingresado ya se encuentra asociado a un Tutor.',
                path: 'personaId',
                location: 'body',
            };
        }
    }
    if (tutor.usuarioId !== validated.usuarioId) {
        updated.usuarioId = validated.usuarioId;
        const existeTutorUsuario = await tutorRepository.findTutorByUsuarioId(validated.usuarioId);
        if ((existeTutorUsuario !== null) && (existeTutorUsuario.id !== tutor.id)) {
            errors.usuarioId = {
                type: 'field',
                msg: 'El ID de Usuario ingresado ya se encuentra asociado a un Tutor.',
                path: 'usuarioId',
                location: 'body',
            };
        }
    }
    if (errors.personaId || errors.usuarioId) {
        throw new ValidationException(errors);
    }

    if (tutor.horasAsignadas !== validated.horasAsignadas) {
        updated.horasAsignadas = validated.horasAsignadas;
    }
    const result = await tutorRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Tutor actualizado.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await tutorRepository.delete(req.params.id);
    apiResponse.success(res, null, "Tutor eliminado.");
});
