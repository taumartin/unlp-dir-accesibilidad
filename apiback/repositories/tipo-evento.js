const {TipoEvento} = require('../models');
const BaseRepository = require("./base");

class TipoEventoRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (TipoEventoRepository._instance === null) {
            TipoEventoRepository._instance = new TipoEventoRepository();
        }
        return TipoEventoRepository._instance;
    }

    constructor() {
        super(TipoEvento);
    }

    createTipoEvento(nombre) {
        return super.create({nombre});
    };

    listTiposEventos(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['nombre'],
            orderBy, orderDirection,
        });
    }
}

module.exports = TipoEventoRepository;
