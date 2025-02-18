const {Eventos} = require('../models');
const BaseRepository = require("./base");

class EventoRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (EventoRepository._instance === null) {
            EventoRepository._instance = new EventoRepository();
        }
        return EventoRepository._instance;
    }

    constructor() {
        super(Eventos);
    }

    createEvento(fechaYHora,descripcion) {
        return super.create({fechaYHora,descripcion,});
    };

    listEventos(page, pageSize, search, orderBy, orderDirection) {
        return super.listAllPaginated({
            page, pageSize, search,
            searchFields: ['fechaYHora', 'descripcion'],
            orderBy, orderDirection,
        })
    }
}

module.exports = EventoRepository;
