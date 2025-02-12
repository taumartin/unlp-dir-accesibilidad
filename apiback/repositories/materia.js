const {Materia} = require('../models');
const BaseRepository = require("./base");

class MateriaRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (MateriaRepository._instance === null) {
            MateriaRepository._instance = new MateriaRepository();
        }
        return MateriaRepository._instance;
    }

    constructor() {
        super(Materia);
    }

    createMateria(nombre, docentes, contacto) {
        return super.create({nombre, docentes, contacto,});
    };

    listMaterias(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['nombre', 'docentes', 'contacto'],
            orderBy, orderDirection,
        })
    }
}

module.exports = MateriaRepository;
