const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const {matchedData, body} = require("express-validator");
const {buildValidation} = require("../utils/validation");
const NotFoundException = require("../exceptions/not-found-exception");
const ValidationException = require("../exceptions/validation-exception");
const tutorRepository = require("../repositories/tutor").getInstance();
const materialAccesibilizadoRepository = require("../repositories/material-accesibilizado").getInstance();
const tutorTrabajoEnMaterialRepository = require("../repositories/tutor-trabajo-en-material").getInstance();

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

const materialAccesibilizadoIdValidation = () => body('materialAccesibilizadoId')
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Material Accesibilizado válido.')
    .bail()
    .custom(async value => {
        const material = await materialAccesibilizadoRepository.findById(value);
        if (material === null) {
            throw new Error('El ID de Material Accesibilizado ingresado no existe.');
        }
    });

const minutosTrabajadosValidation = () => body('minutosTrabajados')
    .isInt({min: 1, max: 1440})
    .withMessage('Los Minutos Trabajados deben ser entre 1 y 1.440.');

const fechaValidation = () => body('fecha')
    .isISO8601()
    .withMessage('La Fecha ingresada no es válida.');

module.exports.createValidation = buildValidation([
    tutorIdValidation(),
    materialAccesibilizadoIdValidation(),
    minutosTrabajadosValidation(),
    fechaValidation(),
]);
module.exports.create = asyncHandler(async (req, res) => {
    const validated = matchedData(req);
    const trabajo = await tutorTrabajoEnMaterialRepository.createTutorTrabajoEnMaterial(validated.tutorId,
        validated.materialAccesibilizadoId, validated.minutosTrabajados, validated.fecha);
    apiResponse.success(res, trabajo, "Tutor-Trabajo-En-Material creado.", 201);
});

module.exports.listAll = asyncHandler(async (req, res) => {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await tutorTrabajoEnMaterialRepository.listTutoresTrabajosEnMateriales(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async (req, res) => {
    const trabajo = await tutorTrabajoEnMaterialRepository.findById(req.params.id);
    if (trabajo === null) {
        throw new NotFoundException("El Tutor-Trabajo-En-Material no existe.");
    }
    apiResponse.success(res, trabajo);
});

module.exports.updateValidation = buildValidation([
    tutorIdValidation(),
    materialAccesibilizadoIdValidation(),
    minutosTrabajadosValidation(),
    fechaValidation(),
]);
module.exports.update = asyncHandler(async (req, res) => {
    const trabajo = await tutorTrabajoEnMaterialRepository.findById(req.params.id);
    if (trabajo === null) {
        throw new NotFoundException('El Tutor-Trabajo-En-Material no existe.');
    }
    const validated = matchedData(req);
    const errors = {};
    const updated = {};
    if ((trabajo.tutorId !== validated.tutorId) ||
        (trabajo.materialAccesibilizadoId !== validated.materialAccesibilizadoId) ||
        (trabajo.fecha !== validated.fecha)) {
        const existeTrabajo = await tutorTrabajoEnMaterialRepository.findTutorTrabajoEnMaterialByTutorAndMaterialAndFecha(validated.tutorId, validated.materialAccesibilizadoId, validated.fecha);
        if ((existeTrabajo !== null) && (existeTrabajo.id !== trabajo.id)) {
            errors.tutorId = {
                type: 'field',
                msg: 'Ya existe un registro para el conjunto Tutor, Material y Fecha seleccionados.',
                path: 'tutorId',
                location: 'body',
            };
        }
    }
    if (errors.tutorId) {
        throw new ValidationException(errors);
    }
    if (trabajo.tutorId !== validated.tutorId) {
        updated.tutorId = validated.tutorId;
    }
    if (trabajo.materialAccesibilizadoId !== validated.materialAccesibilizadoId) {
        updated.materialAccesibilizadoId = validated.materialAccesibilizadoId;
    }
    if (trabajo.minutosTrabajados !== validated.minutosTrabajados) {
        updated.minutosTrabajados = validated.minutosTrabajados;
    }
    if (trabajo.fecha !== validated.fecha) {
        updated.fecha = validated.fecha;
    }
    const result = await tutorTrabajoEnMaterialRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Tutor-Trabajo-En-Material actualizado.");
});

module.exports.delete = asyncHandler(async (req, res) => {
    await tutorTrabajoEnMaterialRepository.delete(req.params.id);
    apiResponse.success(res, null, "Tutor-Trabajo-En-Material eliminado.");
});
