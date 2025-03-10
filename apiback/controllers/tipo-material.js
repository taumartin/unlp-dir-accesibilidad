const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const NotFoundException = require("../exceptions/not-found-exception");
const {buildValidation} = require("../utils/validation");
const {body, matchedData} = require("express-validator");
const tipoMaterialRepository = require("../repositories/tipo-material").getInstance();

const nombreValidation = () => body('nombre')
    .trim()
    .escape()
    .notEmpty()
    .isString()
    .withMessage('Ingresa un nombre válido.')
    .isLength({max: 20})
    .withMessage('El nombre no puede tener más de 20 caracteres.');

module.exports.createValidation = buildValidation([
    nombreValidation(),
]);
module.exports.create = asyncHandler(async function (req, res) {
    const validated = matchedData(req);
    const tipoMaterial = await tipoMaterialRepository.createTipoMaterial(validated.nombre);
    apiResponse.success(res, tipoMaterial, "Tipo de Material creado.", 201);
});

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await tipoMaterialRepository.listTiposMateriales(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = asyncHandler(async function (req, res) {
    const tipoMaterial = await tipoMaterialRepository.findById(req.params.id);
    if (tipoMaterial === null) {
        throw new NotFoundException("El Tipo de Material no existe.");
    }
    apiResponse.success(res, tipoMaterial);
});

module.exports.updateValidation = buildValidation([
    nombreValidation(),
]);
module.exports.update = asyncHandler(async function (req, res) {
    const tipoMaterial = await tipoMaterialRepository.findById(req.params.id);
    if (tipoMaterial === null) {
        throw new NotFoundException('El Tipo de Material no existe.');
    }

    const validated = matchedData(req);
    const updated = {};
    if (tipoMaterial.nombre !== validated.nombre) {
        updated.nombre = validated.nombre;
    }

    const result = await tipoMaterialRepository.update(req.params.id, updated);
    apiResponse.success(res, result, "Tipo de Material actualizado.");
});

module.exports.delete = asyncHandler(async function (req, res) {
    await tipoMaterialRepository.delete(req.params.id);
    apiResponse.success(res, null, "Tipo de Material eliminado.");
});
