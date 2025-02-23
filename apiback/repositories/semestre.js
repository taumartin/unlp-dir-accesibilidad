const {Semestres} = require('../models');
const BaseRepository = require("./base");

class SemestresRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (SemestresRepository._instance === null) {
            SemestresRepository._instance = new SemestresRepository();
        }
        return SemestresRepository._instance;
    }

    constructor() {
        super(Semestres);
    }

    createSemestre(anio,esPrimerSemestre) {
        return super.create({anio,esPrimerSemestre,});
    };

    listSemestres(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['anio', 'esPrimerSemestre'],
            orderBy, orderDirection,
        });
    }
}

module.exports = SemestresRepository;
