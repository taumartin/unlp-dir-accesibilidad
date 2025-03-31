const {MaterialAccesibilizado, Tutor, TutorTrabajoEnMaterial, Persona} = require('../models');
const BaseRepository = require("./base");

class TutorTrabajoEnMaterialRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (TutorTrabajoEnMaterialRepository._instance === null) {
            TutorTrabajoEnMaterialRepository._instance = new TutorTrabajoEnMaterialRepository();
        }
        return TutorTrabajoEnMaterialRepository._instance;
    }

    constructor() {
        super(TutorTrabajoEnMaterial);
    }

    createTutorTrabajoEnMaterial(tutorId, materialAccesibilizadoId, minutosTrabajados, fecha) {
        return super.create({tutorId, materialAccesibilizadoId, minutosTrabajados, fecha});
    }

    listTutoresTrabajosEnMateriales(page, pageSize, search, orderBy, orderDirection) {
        if (orderBy === "@tutor") {
            orderBy = [[{model: Tutor, as: 'tutor'}, {model: Persona, as: 'persona'}, 'apellido'],
                [{model: Tutor, as: 'tutor'}, {model: Persona, as: 'persona'}, 'nombre']];
        } else if (orderBy === "@materialAccesibilizado") {
            orderBy = [[{model: MaterialAccesibilizado, as: 'materialAccesibilizado'}, 'titulo']];
        }
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ["$tutor.persona.apellido$", "$tutor.persona.nombre$", "$materialAccesibilizado.titulo$",
                "$materialAccesibilizado.link$"],
            numericSearchFields: ["tutor.persona.dni"],
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
                model: MaterialAccesibilizado,
                as: 'materialAccesibilizado',
                required: true,
                attributes: ['id', 'titulo', 'link'],
            }],
        });
    }

    findTutorTrabajoEnMaterialByTutorAndMaterialAndFecha(tutorId, materialAccesibilizadoId, fecha) {
        return super.findOneWhere({tutorId, materialAccesibilizadoId, fecha});
    }
}

module.exports = TutorTrabajoEnMaterialRepository;
