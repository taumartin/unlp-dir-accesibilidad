const {Apoyo, Semestre, Tutor, Alumno, Persona} = require('../models');
const BaseRepository = require("./base");

class ApoyoRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (ApoyoRepository._instance === null) {
            ApoyoRepository._instance = new ApoyoRepository();
        }
        return ApoyoRepository._instance;
    }

    constructor() {
        super(Apoyo);
    }

    createApoyo(semestreId, tutorId, alumnoId) {
        return super.create({semestreId, tutorId, alumnoId});
    }

    listApoyos(page, pageSize, search, orderBy, orderDirection) {
        if (orderBy === "@semestre") {
            orderBy = [[{model: Semestre, as: 'semestre'}, 'anio'], [{
                model: Semestre,
                as: 'semestre'
            }, 'es_primer_semestre']];
        } else if (orderBy === "@tutor") {
            orderBy = [[{model: Tutor, as: 'tutor'}, {model: Persona, as: 'persona'}, 'apellido'],
                [{model: Tutor, as: 'tutor'}, {model: Persona, as: 'persona'}, 'nombre']];
        } else if (orderBy === "@alumno") {
            orderBy = [[{model: Alumno, as: 'alumno'}, {model: Persona, as: 'persona'}, 'apellido'],
                [{model: Alumno, as: 'alumno'}, {model: Persona, as: 'persona'}, 'nombre']];
        }
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ["$tutor.persona.apellido$", "$tutor.persona.nombre$", "$alumno.persona.apellido$",
                "$alumno.persona.nombre$", "$alumno.legajo$"],
            numericSearchFields: ["semestre.anio", "tutor.persona.dni", "alumno.persona.dni"],
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
                model: Alumno,
                as: 'alumno',
                required: true,
                attributes: ['id', 'legajo'],
                include: [
                    {
                        model: Persona,
                        as: 'persona',
                        required: true,
                        attributes: ['id', 'nombre', 'apellido', 'dni']
                    }
                ],
            }],
        });
    }

    findApoyoBySemestreTutorAndAlumno(semestreId, tutorId, alumnoId) {
        return super.findOneWhere({semestreId, tutorId, alumnoId});
    }
}

module.exports = ApoyoRepository;
