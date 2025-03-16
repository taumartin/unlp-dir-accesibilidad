const {Op, where, cast, col} = require("sequelize");

class BaseRepository {
    _model = null;

    constructor(model) {
        this._model = model;
    }

    create(props) {
        return this._model.create(props);
    }

    listAll() {
        return this._model.findAll({});
    }

    async listAllPaginated({
                               page = 1,
                               pageSize = 10,
                               search = "",
                               searchFields = [],
                               numericSearchFields = [],
                               orderBy = ["id"],
                               orderDirection = ["asc"],
                               excludeAttributes = [],
                               include = [],
                           } = {}) {
        // Filtering.
        let whereClause = {};
        let conditions = [];
        if (search) {
            if (searchFields.length > 0) {
                conditions.push(
                    ...searchFields.map(field => ({
                        [field]: {[Op.iLike]: `%${search}%`}
                    }))
                );
            }
            if (numericSearchFields.length > 0) {
                conditions.push(
                    ...numericSearchFields.map(field =>
                        where(
                            cast(col(field), "TEXT"),
                            {[Op.iLike]: `%${search}%`}
                        )
                    )
                );
            }
        }
        if (conditions.length > 0) {
            whereClause = {[Op.or]: conditions};
        }

        // Orders.
        if (!Array.isArray(orderBy)) {
            orderBy = [orderBy];
        }
        if (!Array.isArray(orderDirection)) {
            orderDirection = [orderDirection.toLowerCase()];
        } else {
            orderDirection = orderDirection.map(dir => dir.toLowerCase());
        }
        orderDirection = orderBy.map((_, index) =>
            ["asc", "desc"].includes(orderDirection[index]) ? orderDirection[index] : orderDirection[0]
        );
        const order = orderBy.map((field, index) =>
            Array.isArray(field) ? [...field, orderDirection[index]] : [field, orderDirection[index]]
        );

        // Pagination.
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const {count, rows} = await this._model.findAndCountAll({
            where: whereClause,
            order,
            limit,
            offset,
            attributes: {exclude: excludeAttributes},
            include,
        });
        const totalCount = await this._model.count();

        return {
            totalRecords: totalCount,
            filteredRecords: count,
            totalPages: Math.ceil(count / pageSize),
            page: page,
            pageSize,
            data: rows,
        };
    }

    findById(id, options = null) {
        return this._model.findByPk(id, options);
    }

    findOneWhere(where) {
        return this._model.findOne({where});
    }

    findByIdOrThrow(id) {
        return this.findById(id).then(result => {
            if (result !== null) {
                return result;
            }
            throw new Error(`Model ${this._model.name} with id ${id} not found.`);
        });
    }

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
