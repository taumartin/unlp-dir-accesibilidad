const {Usuario} = require('../models');
const BaseRepository = require("./base");
const {Op, fn, col, where} = require("sequelize");
const {hashPassword} = require("../utils/hash");

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

    async createUsuario(username, contrasenia, correo, esAdmin, estaActivo, fotoDePerfil) {
        const password = await hashPassword(contrasenia);
        return super.create({username, password, correo, esAdmin, estaActivo, fotoDePerfil,});
    };

    listUsuarios(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['username', 'correo'],
            orderBy, orderDirection,
            excludeAttributes: ['contrasenia']
        });
    }

    findUsuarioByEmail(email) {
        return super.findOneWhere(where(fn("LOWER", col("correo")), Op.eq, email));
    }

    findUsuarioByUsername(username) {
        return super.findOneWhere(where(fn("LOWER", col("username")), Op.eq, username));
    }

    async findByIdWithoutPassword(id) {
        return super.findById(id, {
            attributes: {exclude: ["contrasenia"]},
        });
    }
}

module.exports = UsuarioRepository;
