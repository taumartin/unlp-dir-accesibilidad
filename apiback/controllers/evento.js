const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const eventoRepository = require("../repositories/evento").getInstance();

module.exports.create = function (req, res) {
    // TODO: validar inputs...
    return eventoRepository.createEvento(
        req.body.fechaYHora,
        req.body.descripcion
    )
        .then(evento => res.status(200).send(evento))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await eventoRepository.listEventos(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = function (req, res) {
    return eventoRepository.findById(req.params.id)
        .then(evento => res.status((evento === null) ? 404 : 200).send(evento))
        .catch(error => res.status(400).send(error));
};

module.exports.update = function (req, res) {
    return eventoRepository.update(req.params.id, {
        fechaYHora: req.body.fechaYHora,
        descripcion: req.body.descripcion,
    })
        .then(evento => res.status((evento === null) ? 404 : 200).send(evento))
        .catch(error => res.status(400).send(error));
}

module.exports.delete = function (req, res) {
    return eventoRepository.delete(req.params.id)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error));
}
