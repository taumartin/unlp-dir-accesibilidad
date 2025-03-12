const {Tutor, Persona, Usuario} = require('../models');
const BaseRepository = require("./base");

class TutorRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (TutorRepository._instance === null) {
            TutorRepository._instance = new TutorRepository();
        }
        return TutorRepository._instance;
    }

    constructor() {
        super(Tutor);
    }

    createTutor(personaId, usuarioId, horasAsignadas) {
        return super.create({personaId, usuarioId, horasAsignadas});
    }

    listTutores(page, pageSize, search, orderBy, orderDirection) {
        if (orderBy === "$persona.nombre$") {
            orderBy = [{model: Persona, as: 'persona'}, 'nombre'];
        } else if (orderBy === "$persona.apellido$") {
            orderBy = [{model: Persona, as: 'persona'}, 'apellido'];
        } else if (orderBy === "$usuario.correo$") {
            orderBy = [{model: Usuario, as: 'usuario'}, 'correo'];
        }
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['$persona.nombre$', '$persona.apellido$', "$usuario.correo$"],
            orderBy, orderDirection,
            excludeAttributes: ['usuario.contrasenia'],
            include: [{
                model: Persona,
                as: 'persona',
                required: true, // INNER JOIN
                attributes: ['id', 'nombre', 'apellido'],
            }, {
                model: Usuario,
                as: 'usuario',
                required: true,
                attributes: ['id', 'correo'],
            }],
        });
    }

    findTutorByPersonaId(personaId) {
        return super.findOneWhere({personaId});
    }

    findTutorByUsuarioId(usuarioId) {
        return super.findOneWhere({usuarioId});
    }
}

module.exports = TutorRepository;
