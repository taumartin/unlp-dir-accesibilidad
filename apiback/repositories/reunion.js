const {Reunion, Tutor, Materia, MedioComunicacion, Alumno, Persona} = require('../models');
const BaseRepository = require("./base");

class ReunionRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (ReunionRepository._instance === null) {
            ReunionRepository._instance = new ReunionRepository();
        }
        return ReunionRepository._instance;
    }

    constructor() {
        super(Reunion);
    }

    createReunion(medioComunicacionId, tutorId, alumnoId, materiaId, fechaYHora, observaciones) {
        return super.create({medioComunicacionId, tutorId, alumnoId, materiaId, fechaYHora, observaciones});
    }

    listReuniones(page, pageSize, search, orderBy, orderDirection) {
        if (orderBy === "@tutor") {
            orderBy = [[{model: Tutor, as: 'tutor'}, {model: Persona, as: 'persona'}, 'apellido'],
                [{model: Tutor, as: 'tutor'}, {model: Persona, as: 'persona'}, 'nombre']];
        } else if (orderBy === "@alumno") {
            orderBy = [[{model: Alumno, as: 'alumno'}, {model: Persona, as: 'persona'}, 'apellido'],
                [{model: Alumno, as: 'alumno'}, {model: Persona, as: 'persona'}, 'nombre']];
        } else if (orderBy === "@materia") {
            orderBy = [[{model: Materia, as: 'materia'}, 'nombre']];
        } else if (orderBy === "@medioComunicacion") {
            orderBy = [[{model: MedioComunicacion, as: 'medioComunicacion'}, 'nombre']];
        }
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ["$tutor.persona.apellido$", "$tutor.persona.nombre$", "$alumno.persona.apellido$", "$alumno.persona.nombre$",
                "$materia.nombre$", "$medioComunicacion.nombre$", "$alumno.legajo$"],
            numericSearchFields: ["tutor.persona.dni", "alumno.persona.dni"],
            orderBy, orderDirection,
            include: [{
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
            }, {
                model: Materia,
                as: 'materia',
                required: false,
                attributes: ['id', 'nombre'],
            }, {
                model: MedioComunicacion,
                as: 'medioComunicacion',
                required: true,
                attributes: ['id', 'nombre'],
            }],
        });
    }

    findReunionByTutorAndFechaYHora(tutorId, fechaYHora) {
        return super.findOneWhere({tutorId, fechaYHora});
    }
}

module.exports = ReunionRepository;
