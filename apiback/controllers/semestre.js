const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const semestresRepository = require("../repositories/semestre").getInstance();

module.exports.create = function (req, res) {
    // TODO: validar inputs...
    return semestresRepository.createSemestre(
        req.body.anio,
        req.body.esPrimerSemestre,
    )
        .then(semestre => res.status(200).send(semestre))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = asyncHandler(async function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await semestresRepository.listSemestres(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = function (req, res) {
    return semestresRepository.findById(req.params.id)
        .then(semestre => res.status((semestre === null) ? 404 : 200).send(semestre))
        .catch(error => res.status(400).send(error));
};

module.exports.update = function (req, res) {
    return semestresRepository.update(req.params.id, {
        anio: req.body.anio,
        esPrimerSemestre: req.body.esPrimerSemestre
    })
        .then(semestre => res.status((semestre === null) ? 404 : 200).send(semestre))
        .catch(error => res.status(400).send(error));
}

module.exports.delete = function (req, res) {
    return semestresRepository.delete(req.params.id)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error));
}
