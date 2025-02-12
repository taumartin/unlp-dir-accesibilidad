const {Persona} = require('../models');
const personaRepository = require("../repositories/persona").getInstance();

module.exports.create = function (req, res) {
    return personaRepository.create(
        req.body.nombre,
        req.body.apellido,
        req.body.dni,
        req.body.telefono,
        req.body.email
    )
        .then(persona => res.status(200).send(persona))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = function (req, res) {
    return personaRepository.listAll()
        .then(personaList => res.status(200).send(personaList))
        .catch(error => res.status(400).send(error));
};

module.exports.findById = function (req, res) {
    return personaRepository.findById(req.params.id)
        .then(persona => res.status((persona === null) ? 404 : 200).send(persona))
        .catch(error => res.status(400).send(error));
};

module.exports.update = function (req, res) {
    return personaRepository.update(req.params.id, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        telefono: req.body.telefono,
        email: req.body.email,
    })
        .then(persona => res.status((persona === null) ? 404 : 200).send(persona))
        .catch(error => res.status(400).send(error));
}

module.exports.delete = function (req, res) {
    return personaRepository.delete(req.params.id)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error));
}
