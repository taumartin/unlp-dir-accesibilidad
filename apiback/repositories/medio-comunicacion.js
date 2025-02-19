const {MediosDeComunicacion} = require('../models');
const BaseRepository = require("./base");

class MediosDeComunicacionRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (MediosDeComunicacionRepository._instance === null) {
            MediosDeComunicacionRepository._instance = new MediosDeComunicacionRepository();
        }
        return MediosDeComunicacionRepository._instance;
    }

    constructor() {
        super(MediosDeComunicacion);
    }

    createMedio(nombre) {
        return super.create({nombre});
    };

    listMediosDeComunicacion(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['nombre'],
            orderBy, orderDirection,
        })
    }
}

module.exports = MediosDeComunicacionRepository;
