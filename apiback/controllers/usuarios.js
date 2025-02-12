const usuarioRepository = require("../repositories/usuarios").getInstance();

module.exports.create = function (req, res) {
    // TODO: validar inputs...
    return usuarioRepository.createUsuario(
        req.body.nombre,
        req.body.contrasenia,
        req.body.correo,
        req.body.tipo,
        req.body.estaActivo,
        req.body.fotoDePerfil
    )
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = function (req, res) {
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    return usuarioRepository.listUsuarios(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",)
        .then(usuarioList => res.status(200).send(usuarioList))
        .catch(error => res.status(400).send(error));
};

module.exports.findById = function (req, res) {
    return usuarioRepository.findById(req.params.id)
        .then(usuario => res.status((usuario === null) ? 404 : 200).send(usuario))
        .catch(error => res.status(400).send(error));
};

module.exports.update = function (req, res) {
    return usuarioRepository.update(req.params.id, {
        nombre:req.body.nombre,
        contrasenia:req.body.contrasenia,
        correo:req.body.correo,
        tipo:req.body.tipo,
        estaActivo:req.body.estaActivo,
        fotoDePerfil:req.body.fotoDePerfil
    })
        .then(usuario => res.status((usuario === null) ? 404 : 200).send(usuario))
        .catch(error => res.status(400).send(error));
}

module.exports.delete = function (req, res) {
    return usuarioRepository.delete(req.params.id)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error));
}
