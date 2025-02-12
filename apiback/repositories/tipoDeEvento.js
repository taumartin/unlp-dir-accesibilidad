const {tiposdeeventos} = require('../models');
const BaseRepository = require("./base");

class TiposDeEventosRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (TiposDeEventosRepository._instance === null) {
            TiposDeEventosRepository._instance = new TiposDeEventosRepository();
        }
        return TiposDeEventosRepository._instance;
    }

    constructor() {
        super(tiposdeeventos);
    }

    createTipoDeEvento(nombre) {
        return super.create({nombre});
    };

    listTiposDeEventos(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['nombre'],
            orderBy, orderDirection,
        })
    }
}

module.exports = TiposDeEventosRepository;
