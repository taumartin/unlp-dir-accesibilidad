const materiaRepository = require("../repositories/materia").getInstance();

module.exports.create = function (req, res) {
    // TODO: validar inputs...
    return materiaRepository.createMateria(
        req.body.nombre,
        req.body.docentes,
        req.body.contacto
    )
        .then(materia => res.status(200).send(materia))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    return materiaRepository.listMaterias(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",)
        .then(materiaList => res.status(200).send(materiaList))
        .catch(error => res.status(400).send(error));
};

module.exports.findById = function (req, res) {
    return materiaRepository.findById(req.params.id)
        .then(materia => res.status((materia === null) ? 404 : 200).send(materia))
        .catch(error => res.status(400).send(error));
};

module.exports.update = function (req, res) {
    return materiaRepository.update(req.params.id, {
        nombre: req.body.nombre,
        docentes: req.body.docentes,
        contacto: req.body.contacto
    })
        .then(materia => res.status((materia === null) ? 404 : 200).send(materia))
        .catch(error => res.status(400).send(error));
}

module.exports.delete = function (req, res) {
    return materiaRepository.delete(req.params.id)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error));
}
