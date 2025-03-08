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

    createUsuario(username, contrasenia, correo, esAdmin, estaActivo, fotoDePerfil) {
        return super.create({username, contrasenia, correo, esAdmin, estaActivo, fotoDePerfil,});
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

    findById(id) {
        const rta=super.findById(id).then(usuario=>{
            if(usuario)
                usuario.contrasenia=undefined;
            return usuario;
        })
        return rta
    }
}

module.exports = UsuarioRepository;
