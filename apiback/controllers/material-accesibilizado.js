const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const {matchedData, body} = require("express-validator");
const {buildValidation} = require("../utils/validation");
const NotFoundException = require("../exceptions/not-found-exception");
const ValidationException = require("../exceptions/validation-exception");
const tipoMaterialRepository = require("../repositories/tipo-material").getInstance();
const materiaRepository = require("../repositories/materia").getInstance();
const materialAccesibilizadoRepository = require("../repositories/material-accesibilizado").getInstance();

const tipoMaterialIdValidation = () => body('tipoMaterialId')
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Tipo de Material válido.')
    .bail()
    .custom(async value => {
        const usuario = await tipoMaterialRepository.findById(value);
        if (usuario === null) {
            throw new Error('El ID de Tipo de Material ingresado no existe.');
        }
    });

const materiaIdValidation = () => body('materiaId')
    .isInt({min: 1})
    .withMessage('Ingresa un ID de Materia válido.')
    .bail()
    .custom(async value => {
        const usuario = await materiaRepository.findById(value);
        if (usuario === null) {
            throw new Error('El ID de Materia ingresado no existe.');
        }
    });

const fechaPublicacionValidation = () => body('fechaPublicacion')
    .isISO8601()
    .withMessage('El valor ingresado no es válido.');

const tituloValidation = () => body('titulo')
    .trim()
    .isLength({min: 3, max: 100})
    .withMessage('El Título debe tener entre 3 y 100 caracteres.');

const linkValidation = () => body('link')
    .trim()
    .isURL({protocols: ['http', 'https'], require_protocol: true, require_valid_protocol: true})
    .isLength({max: 255})
    .withMessage('Ingresa un Link válido.');

module.exports.createValidation = buildValidation([
    tipoMaterialIdValidation(),
    materiaIdValidation(),
    fechaPublicacionValidation(),
    tituloValidation(),
    linkValidation()
        .bail()
        .custom(async value => {
            const material = await materialAccesibilizadoRepository.findMaterialAccesibilizadoByLink(value);
            if (material !== null) {
                throw new Error('El Link ingresado ya existe.');
            }
        }),
]);
module.exports.create = asyncHandler(async (req, res) => {
    const validated = matchedData(req);
    const material = await materialAccesibilizadoRepository.createMaterialAccesibilizado(validated.tipoMaterialId,
        validated.materiaId, validated.fechaPublicacion, validated.titulo, validated.link);
    apiResponse.success(res, material, "Material Accesibilizado creado.", 201);
});

module.exports.listAll = asyncHandler(async (req, res) => {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await materialAccesibilizadoRepository.listMaterialesAccesibilizados(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async (req, res) => {
    const material = await materialAccesibilizadoRepository.findById(req.params.id);
    if (material === null) {
        throw new NotFoundException("El Material Accesibilizado no existe.");
    }
    apiResponse.success(res, material);
});

module.exports.updateValidation = buildValidation([
    tipoMaterialIdValidation(),
    materiaIdValidation(),
    fechaPublicacionValidation(),
    tituloValidation(),
    linkValidation(),
]);
module.exports.update = asyncHandler(async (req, res) => {
    const material = await materialAccesibilizadoRepository.findById(req.params.id);
    if (material === null) {
        throw new NotFoundException('El Material Accesibilizado no existe.');
    }
    const validated = matchedData(req);
    const errors = {};
    const updated = {};
    if (material.link !== validated.link) {
        updated.link = validated.link;
        const existeMaterial = await materialAccesibilizadoRepository.findMaterialAccesibilizadoByLink(validated.link);
        if ((existeMaterial !== null) && (existeMaterial.id !== material.id)) {
            errors.link = {
                type: 'field',
                msg: 'El Link ingresado ya existe.',
                path: 'link',
                location: 'body',
            };
        }
    }
    if (errors.link) {
        throw new ValidationException(errors);
    }
    if (material.tipoMaterialId !== validated.tipoMaterialId) {
        updated.tipoMaterialId = validated.tipoMaterialId;
    }
    if (material.materiaId !== validated.materiaId) {
        updated.materiaId = validated.materiaId;
    }
    if (material.fechaPublicacion !== validated.fechaPublicacion) {
        updated.fechaPublicacion = validated.fechaPublicacion;
    }
    if (material.titulo !== validated.titulo) {
        updated.titulo = validated.titulo;
    }
    const result = await materialAccesibilizadoRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Material Accesibilizado actualizado.");
});

module.exports.delete = asyncHandler(async (req, res) => {
    await materialAccesibilizadoRepository.delete(req.params.id);
    apiResponse.success(res, null, "Material Accesibilizado eliminado.");
});
