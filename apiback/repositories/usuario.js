const {Usuario} = require('../models');
const BaseRepository = require("./base");
const {Op, fn, col, where} = require("sequelize");

class UsuarioRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (UsuarioRepository._instance === null) {
            UsuarioRepository._instance = new UsuarioRepository();
        }
        return UsuarioRepository._instance;
    }

    constructor() {
        super(Usuario);
    }

    createUsuario(nombre, contrasenia, correo, esAdmin, estaActivo, fotoDePerfil) {
        return super.create({nombre, contrasenia, correo, esAdmin, estaActivo, fotoDePerfil,});
    };

    listUsuarios(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['nombre', 'correo'],
            orderBy, orderDirection,
        });
    }

    findUsuarioByEmail(email) {
        return super.findOneWhere(where(fn("LOWER", col("correo")), Op.eq, email));
    }

    findUsuarioByUsername(username) {
        return super.findOneWhere(where(fn("LOWER", col("nombre")), Op.eq, username));
    }
}

module.exports = UsuarioRepository;
