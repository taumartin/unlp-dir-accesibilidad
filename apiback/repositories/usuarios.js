const {Usuario} = require('../models');
const BaseRepository = require("./base");

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

    createUsuario(nombre, contrasenia, correo, tipo, estaActivo, fotoDePerfil) {
        return super.create({nombre, contrasenia, correo, tipo, estaActivo, fotoDePerfil,});
    };

    listUsuarios(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['nombre', 'contrasenia', 'correo', 'tipo','estaActivo','fotoDePerfil'],
            orderBy, orderDirection,
        })
    }
}

module.exports = UsuarioRepository;
