const eventoRepository = require("../repositories/eventos").getInstance();

module.exports.create = function (req, res) {
    // TODO: validar inputs...
    return eventoRepository.createEvento(
        req.body.fechaYHora,
        req.body.descripcion
    )
        .then(evento => res.status(200).send(evento))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    return eventoRepository.listEventos(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",)
        .then(eventoList => res.status(200).send(eventoList))
        .catch(error => res.status(400).send(error));
};

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
