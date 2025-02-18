const tipoDeMaterialesRepository = require("../repositories/tipoDeMaterial").getInstance();

module.exports.create = function (req, res) {
    // TODO: validar inputs...
    return tipoDeMaterialesRepository.createTipoDeMaterial(
        req.body.nombre
    )
        .then(material => res.status(200).send(material))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    return tipoDeMaterialesRepository.listTiposDeMateriales(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",)
        .then(tipoDeMaterialList => res.status(200).send(tipoDeMaterialList))
        .catch(error => res.status(400).send(error));
};

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
