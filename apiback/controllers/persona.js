const {Persona} = require('../models');

module.exports.create = function (req, res) {
    return Persona.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        telefono: req.body.telefono,
        email: req.body.email,
    })
        .then(persona => res.status(200).send(persona))
        .catch(error => res.status(400).send(error))
};

module.exports.listAll = function (req, res) {
    return Persona.findAll({})
        .then(personaList => res.status(200).send(personaList))
        .catch(error => res.status(400).send(error))
};

module.exports.findById = function (req, res) {
    return Persona.findByPk(req.params.id, null)
        .then(persona => res.status((persona === null) ? 404 : 200).send(persona))
        .catch(error => res.status(400).send(error))
};
