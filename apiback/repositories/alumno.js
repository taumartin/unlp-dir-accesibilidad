const {Alumno, Persona} = require('../models');
const BaseRepository = require("./base");

class AlumnoRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (AlumnoRepository._instance === null) {
            AlumnoRepository._instance = new AlumnoRepository();
        }
        return AlumnoRepository._instance;
    }

    constructor() {
        super(Alumno);
    }

    createAlumno(personaId, legajo, tieneCertificado, situacion) {
        return super.create({personaId, legajo, tieneCertificado, situacion});
    }

    listAlumnos(page, pageSize, search, orderBy, orderDirection) {
        if (orderBy === "$persona.nombre$") {
            orderBy = [{model: Persona, as: 'persona'}, 'nombre'];
        } else if (orderBy === "$persona.apellido$") {
            orderBy = [{model: Persona, as: 'persona'}, 'apellido'];
        }
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['$persona.nombre$', '$persona.apellido$', "legajo", "situacion"],
            orderBy, orderDirection,
            include: [{
                model: Persona,
                as: 'persona',
                required: true, // INNER JOIN
                attributes: ['id', 'nombre', 'apellido'],
            }],
        });
    }

    findAlumnoByPersonaId(personaId) {
        return super.findOneWhere({personaId});
    }

    findAlumnoByLegajo(legajo) {
        return super.findOneWhere({legajo});
    }
}

module.exports = AlumnoRepository;
