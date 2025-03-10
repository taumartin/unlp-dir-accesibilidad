const {TipoMaterial} = require('../models');
const BaseRepository = require("./base");

class TipoMaterialRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (TipoMaterialRepository._instance === null) {
            TipoMaterialRepository._instance = new TipoMaterialRepository();
        }
        return TipoMaterialRepository._instance;
    }

    constructor() {
        super(TipoMaterial);
    }

    createTipoMaterial(nombre) {
        return super.create({nombre});
    };

    listTiposMateriales(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['nombre'],
            orderBy, orderDirection,
        });
    }
}

module.exports = TipoMaterialRepository;
