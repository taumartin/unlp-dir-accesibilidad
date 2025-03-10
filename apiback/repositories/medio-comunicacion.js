const {MedioComunicacion} = require('../models');
const BaseRepository = require("./base");

class MedioComunicacionRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (MedioComunicacionRepository._instance === null) {
            MedioComunicacionRepository._instance = new MedioComunicacionRepository();
        }
        return MedioComunicacionRepository._instance;
    }

    constructor() {
        super(MedioComunicacion);
    }

    createMedioComunicacion(nombre) {
        return super.create({nombre});
    };

    listMediosComunicacion(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['nombre'],
            orderBy, orderDirection,
        });
    }
}

module.exports = MedioComunicacionRepository;
