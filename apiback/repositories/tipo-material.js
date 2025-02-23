const {TiposDeMateriales} = require('../models');
const BaseRepository = require("./base");

class TiposDeMaterialRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (TiposDeMaterialRepository._instance === null) {
            TiposDeMaterialRepository._instance = new TiposDeMaterialRepository();
        }
        return TiposDeMaterialRepository._instance;
    }

    constructor() {
        super(TiposDeMateriales);
    }

    createTipoDeMaterial(nombre) {
        return super.create({nombre});
    };

    listTiposDeMateriales(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['nombre'],
            orderBy, orderDirection,
        });
    }
}

module.exports = TiposDeMaterialRepository;
