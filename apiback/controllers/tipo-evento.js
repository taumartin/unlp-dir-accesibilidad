const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const tiposDeEventosRepository = require("../repositories/tipo-evento").getInstance();

module.exports.create = function (req, res) {
    // TODO: validar inputs...
    return tiposDeEventosRepository.createTipoDeEvento(
        req.body.nombre
    )
        .then(tipo => res.status(200).send(tipo))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await tiposDeEventosRepository.listTiposDeEventos(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = function (req, res) {
    return tiposDeEventosRepository.findById(req.params.id)
        .then(tipo => res.status((tipo === null) ? 404 : 200).send(tipo))
        .catch(error => res.status(400).send(error));
};

module.exports.update = function (req, res) {
    return tiposDeEventosRepository.update(req.params.id, {
        nombre: req.body.nombre
    })
        .then(tipo => res.status((tipo === null) ? 404 : 200).send(tipo))
        .catch(error => res.status(400).send(error));
}

module.exports.delete = function (req, res) {
    return tiposDeEventosRepository.delete(req.params.id)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error));
}
