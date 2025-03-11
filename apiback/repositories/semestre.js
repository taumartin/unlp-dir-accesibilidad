const {Semestre} = require('../models');
const BaseRepository = require("./base");

class SemestreRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (SemestreRepository._instance === null) {
            SemestreRepository._instance = new SemestreRepository();
        }
        return SemestreRepository._instance;
    }

    constructor() {
        super(Semestre);
    }

    createSemestre(anio, esPrimerSemestre) {
        return super.create({anio, esPrimerSemestre,});
    };

    listSemestres(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['anio', 'esPrimerSemestre'],
            orderBy, orderDirection,
        });
    }
}

module.exports = SemestreRepository;
