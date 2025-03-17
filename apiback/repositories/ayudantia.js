const {Ayudantia, Semestre, Tutor, Materia, Persona} = require('../models');
const BaseRepository = require("./base");

class AyudantiaRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (AyudantiaRepository._instance === null) {
            AyudantiaRepository._instance = new AyudantiaRepository();
        }
        return AyudantiaRepository._instance;
    }

    constructor() {
        super(Ayudantia);
    }

    createAyudantia(semestreId, tutorId, materiaId) {
        return super.create({semestreId, tutorId, materiaId});
    }

    listAyudantias(page, pageSize, search, orderBy, orderDirection) {
        if (orderBy === "@semestre") {
            orderBy = [[{model: Semestre, as: 'semestre'}, 'anio'], [{
                model: Semestre,
                as: 'semestre'
            }, 'es_primer_semestre']];
        } else if (orderBy === "@tutor") {
            orderBy = [[{model: Tutor, as: 'tutor'}, {model: Persona, as: 'persona'}, 'apellido'],
                [{model: Tutor, as: 'tutor'}, {model: Persona, as: 'persona'}, 'nombre']];
        } else if (orderBy === "@materia") {
            orderBy = [{model: Materia, as: 'materia'}, 'nombre'];
        }
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ["$tutor.persona.apellido$", "$tutor.persona.nombre$", "$materia.nombre$"],
            numericSearchFields: ["semestre.anio", "tutor.persona.dni"],
            orderBy, orderDirection,
            include: [{
                model: Semestre,
                as: 'semestre',
                required: true, // INNER JOIN
                attributes: ['id', 'anio', 'es_primer_semestre'],
            }, {
                model: Tutor,
                as: 'tutor',
                required: true,
                attributes: ['id'],
                include: [
                    {
                        model: Persona,
                        as: 'persona',
                        required: true,
                        attributes: ['id', 'nombre', 'apellido', 'dni']
                    }
                ],
            }, {
                model: Materia,
                as: 'materia',
                required: true,
                attributes: ['id', 'nombre'],
            }],
        });
    }

    findAyudantiaBySemestreTutorAndMateria(semestreId, tutorId, materiaId) {
        return super.findOneWhere({semestreId, tutorId, materiaId});
    }
}

module.exports = AyudantiaRepository;
