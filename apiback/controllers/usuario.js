const apiResponse = require("../utils/api-response");
const {asyncHandler} = require("../utils/async-handler");
const usuarioRepository = require("../repositories/usuario").getInstance();

module.exports.create = function (req, res) {
    // TODO: validar inputs...
    return usuarioRepository.createUsuario(
        req.body.nombre,
        req.body.contrasenia,
        req.body.correo,
        req.body.esAdmin,
        req.body.estaActivo,
        req.body.fotoDePerfil
    )
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error));
};

module.exports.listAll = asyncHandler(async function (req, res) {
    // TODO: no se debe publicar la contraseña de los usuarios...
    const {page, pageSize, search, orderBy, orderDirection} = req.query;
    const response = await usuarioRepository.listUsuarios(parseInt(page) || 1, parseInt(pageSize) || 10,
        search || "", orderBy || "id", orderDirection || "asc",);
    apiResponse.success(res, response);
});

module.exports.findById = function (req, res) {
    return usuarioRepository.findById(req.params.id)
        .then(usuario => res.status((usuario === null) ? 404 : 200).send(usuario))
        .catch(error => res.status(400).send(error));
};

module.exports.update = function (req, res) {
    return usuarioRepository.update(req.params.id, {
        nombre: req.body.nombre,
        contrasenia: req.body.contrasenia,
        correo: req.body.correo,
        tipo: req.body.tipo,
        estaActivo: req.body.estaActivo,
        fotoDePerfil: req.body.fotoDePerfil
    })
        .then(usuario => res.status((usuario === null) ? 404 : 200).send(usuario))
        .catch(error => res.status(400).send(error));
}

module.exports.delete = function (req, res) {
    return usuarioRepository.delete(req.params.id)
        .then(() => res.status(200).send())
        .catch(error => res.status(400).send(error));
}
