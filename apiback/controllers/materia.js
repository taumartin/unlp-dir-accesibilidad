const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
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

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await materiaRepository.listMaterias(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

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
