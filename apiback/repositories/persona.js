const {Persona} = require('../models');
const BaseRepository = require("./base");
const {where, fn, col, Op} = require("sequelize");

class PersonaRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (PersonaRepository._instance === null) {
            PersonaRepository._instance = new PersonaRepository();
        }
        return PersonaRepository._instance;
    }

    constructor() {
        super(Persona);
    }

    createPersona(nombre, apellido, dni, telefono, email) {
        return super.create({nombre, apellido, dni, telefono, email,});
    }

    listPersonas(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['nombre', 'apellido', 'telefono', 'email'],
            numericSearchFields: ['dni'],
            orderBy, orderDirection,
        });
    }

    findPersonaByEmail(email) {
        return super.findOneWhere(where(fn("LOWER", col("email")), Op.eq, email));
    }

    findPersonaByDni(dni) {
        return super.findOneWhere({dni});
    }
}

module.exports = PersonaRepository;
