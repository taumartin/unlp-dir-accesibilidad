const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const medioDeComunicacionRepository = require("../repositories/medio-comunicacion").getInstance();

module.exports.create = function (req, res) {
    // TODO: validar inputs...
    return medioDeComunicacionRepository.createMedioDeComunicacion(
        req.body.nombre
    )
        .then(medio => res.status(200).send(medio))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await medioDeComunicacionRepository.listMediosDeComunicacion(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = function (req, res) {
    return medioDeComunicacionRepository.findById(req.params.id)
        .then(medio => res.status((medio === null) ? 404 : 200).send(medio))
        .catch(error => res.status(400).send(error));
};

module.exports.update = function (req, res) {
    return medioDeComunicacionRepository.update(req.params.id, {
        nombre: req.body.nombre
    })
        .then(medio => res.status((medio === null) ? 404 : 200).send(medio))
        .catch(error => res.status(400).send(error));
}

module.exports.delete = function (req, res) {
    return medioDeComunicacionRepository.delete(req.params.id)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error));
}
