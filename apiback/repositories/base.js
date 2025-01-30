class BaseRepository {
    _model = null;

    constructor(model) {
        this._model = model;
    }

    create(props) {
        return this._model.create(props);
    };

    listAll() {
        return this._model.findAll({});
    };

    findById(id) {
        return this._model.findByPk(id, null);
    };

    findByIdOrThrow(id) {
        return this.findById(id).then(result => {
            if (result !== null) {
                return result;
            }
            throw new Error(`Model ${this._model.name} with id ${id} not found.`);
        });
    };

    update(id, props) {
        return this.findById(id).then(result => (result !== null) ? result.update(props) : null);
    }

    updateOrThrow(id, props) {
        return this.findByIdOrThrow(id).then(result => result.update(props));
    }

    delete(id) {
        return this.findByIdOrThrow(id).then(result => result.destroy());
    }
}

module.exports = BaseRepository;
