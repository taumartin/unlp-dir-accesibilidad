const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const {matchedData, body} = require("express-validator");
const {buildValidation} = require("../utils/validation");
const NotFoundException = require("../exceptions/not-found-exception");
const ValidationException = require("../exceptions/validation-exception");
const tutorRepository = require("../repositories/tutor").getInstance();
const alumnoRepository = require("../repositories/alumno").getInstance();
const materiaRepository = require("../repositories/materia").getInstance();
const medioComunicacionRepository = require("../repositories/medio-comunicacion").getInstance();
const reunionRepository = require("../repositories/reunion").getInstance();

const medioComunicacionIdValidation = () => body('medioComunicacionId')
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Medio de Comunicación válido.')
    .bail()
    .custom(async value => {
        const medioComunicacion = await medioComunicacionRepository.findById(value);
        if (medioComunicacion === null) {
            throw new Error('El ID de Medio de Comunicación ingresado no existe.');
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

const materiaIdValidation = () => body('materiaId')
    .optional({values: 'null'})
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Materia válido.')
    .bail()
    .custom(async value => {
        const materia = await materiaRepository.findById(value);
        if (materia === null) {
            throw new Error('El ID de Materia ingresado no existe.');
        }
    });

const fechaYHoraValidation = () => body('fechaYHora')
    .isISO8601()
    .withMessage('La Fecha ingresada no es válida.');

const observacionesValidation = () => body('observaciones')
    .trim()
    .escape()
    .optional({checkFalsy: true})
    .isLength({max: 5_000})
    .withMessage('Las Observaciones no pueden tener más de 5.000 caracteres.');

module.exports.createValidation = buildValidation([
    medioComunicacionIdValidation(),
    tutorIdValidation(),
    alumnoIdValidation(),
    materiaIdValidation(),
    fechaYHoraValidation(),
    observacionesValidation(),
]);
module.exports.create = asyncHandler(async (req, res) => {
    const validated = matchedData(req, {includeOptionals: true});
    const reunion = await reunionRepository.createReunion(validated.medioComunicacionId, validated.tutorId,
        validated.alumnoId, validated.materiaId, validated.fechaYHora, validated.observaciones);
    apiResponse.success(res, reunion, "Reunión creada.", 201);
});

module.exports.listAll = asyncHandler(async (req, res) => {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await reunionRepository.listReuniones(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async (req, res) => {
    const reunion = await reunionRepository.findById(req.params.id);
    if (reunion === null) {
        throw new NotFoundException("La Reunión no existe.");
    }
    apiResponse.success(res, reunion);
});

module.exports.updateValidation = buildValidation([
    medioComunicacionIdValidation(),
    tutorIdValidation(),
    alumnoIdValidation(),
    materiaIdValidation(),
    fechaYHoraValidation(),
    observacionesValidation(),
]);
module.exports.update = asyncHandler(async (req, res) => {
    const reunion = await reunionRepository.findById(req.params.id);
    if (reunion === null) {
        throw new NotFoundException('La Reunión no existe.');
    }
    const validated = matchedData(req, {includeOptionals: true});
    const errors = {};
    const updated = {};
    if ((reunion.tutorId !== validated.tutorId) || (reunion.fechaYHora !== validated.fechaYHora)) {
        const existeReunion = await reunionRepository.findReunionByTutorAndFechaYHora(validated.tutorId, validated.fechaYHora);
        if ((existeReunion !== null) && (existeReunion.id !== reunion.id)) {
            errors.tutorId = {
                type: 'field',
                msg: 'Ya existe una Reunión para el Tutor y Fecha seleccionados.',
                path: 'tutorId',
                location: 'body',
            };
        }
    }
    if (errors.tutorId) {
        throw new ValidationException(errors);
    }
    if (reunion.tutorId !== validated.tutorId) {
        updated.tutorId = validated.tutorId;
    }
    if (reunion.medioComunicacionId !== validated.medioComunicacionId) {
        updated.medioComunicacionId = validated.medioComunicacionId;
    }
    if (reunion.alumnoId !== validated.alumnoId) {
        updated.alumnoId = validated.alumnoId;
    }
    if (reunion.materiaId !== validated.materiaId) {
        updated.materiaId = validated.materiaId;
    }
    if (reunion.fechaYHora !== validated.fechaYHora) {
        updated.fechaYHora = validated.fechaYHora;
    }
    if (reunion.observaciones !== validated.observaciones) {
        updated.observaciones = validated.observaciones;
    }
    const result = await reunionRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Reunión actualizada.");
});

module.exports.delete = asyncHandler(async (req, res) => {
    await reunionRepository.delete(req.params.id);
    apiResponse.success(res, null, "Reunión eliminada.");
});
