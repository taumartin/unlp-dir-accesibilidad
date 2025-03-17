const {MaterialAccesibilizado, Materia, TipoMaterial} = require('../models');
const BaseRepository = require("./base");

class MaterialAccesibilizadoRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (MaterialAccesibilizadoRepository._instance === null) {
            MaterialAccesibilizadoRepository._instance = new MaterialAccesibilizadoRepository();
        }
        return MaterialAccesibilizadoRepository._instance;
    }

    constructor() {
        super(MaterialAccesibilizado);
    }

    createMaterialAccesibilizado(tipoMaterialId, materiaId, fechaPublicacion, titulo, link) {
        return super.create({tipoMaterialId, materiaId, fechaPublicacion, titulo, link});
    }

    listMaterialesAccesibilizados(page, pageSize, search, orderBy, orderDirection) {
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
            searchFields: ["titulo", "link", "$materia.nombre$", "$tipoMaterial.nombre$"],
            orderBy, orderDirection,
            include: [{
                model: Materia,
                as: 'materia',
                required: true, // INNER JOIN
                attributes: ['id', 'nombre'],
            }, {
                model: TipoMaterial,
                as: 'tipoMaterial',
                required: true,
                attributes: ['id', 'nombre'],
            }],
        });
    }

    findMaterialAccesibilizadoByLink(link) {
        return super.findOneWhere({link});
    }
}

module.exports = MaterialAccesibilizadoRepository;
