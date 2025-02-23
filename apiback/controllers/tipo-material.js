const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const tipoDeMaterialesRepository = require("../repositories/tipo-material").getInstance();

module.exports.create = function (req, res) {
    // TODO: validar inputs...
    return tipoDeMaterialesRepository.createTipoDeMaterial(
        req.body.nombre
    )
        .then(material => res.status(200).send(material))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await tipoDeMaterialesRepository.listTiposDeMateriales(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = function (req, res) {
    return tipoDeMaterialesRepository.findById(req.params.id)
        .then(material => res.status((material === null) ? 404 : 200).send(material))
        .catch(error => res.status(400).send(error));
};

module.exports.update = function (req, res) {
    return tipoDeMaterialesRepository.update(req.params.id, {
        nombre: req.body.nombre
    })
        .then(tipo => res.status((tipo === null) ? 404 : 200).send(tipo))
        .catch(error => res.status(400).send(error));
}

module.exports.delete = function (req, res) {
    return tipoDeMaterialesRepository.delete(req.params.id)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error));
}
