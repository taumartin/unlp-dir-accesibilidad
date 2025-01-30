const {Persona} = require('../models');
const BaseRepository = require("./base");

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

    create(nombre, apellido, dni, telefono, email) {
        return super.create({
            nombre,
            apellido,
            dni,
            telefono,
            email,
        });
    };
}

module.exports = PersonaRepository;
