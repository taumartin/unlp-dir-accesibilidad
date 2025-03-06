const {Usuario} = require('../models');
const BaseRepository = require("./base");
const {Op, fn, col, where} = require("sequelize");

class UsuarioRepository extends BaseRepository {
    static _instance = null;

    static getInstance() {
        if (UsuarioRepository._instance === null) {
            UsuarioRepository._instance = new UsuarioRepository();
        }
        return UsuarioRepository._instance;
    }

    constructor() {
        super(Usuario);
    }

    async listUsuariosPaginated({
                               page = 1,
                               pageSize = 10,
                               search = "",
                               searchFields = [],
                               orderBy = "id",
                               orderDirection = "asc"
                           } = {}) {
        // Filtering.
        let whereClause = {};
        if (search && (searchFields.length > 0)) {
            whereClause = {
                [Op.or]: searchFields.map(field => ({
                    [field]: {
                        [Op.iLike]: `%${search}%`
                    },
                })),
            };
        }

        // Orders.
        orderDirection = orderDirection.toLowerCase();
        const validOrderDirection = ["asc", "desc"].includes(orderDirection) ? orderDirection : "asc";

        // Pagination.
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const {count, rows} = await this._model.findAndCountAll({
            where: whereClause,
            order: [[orderBy, validOrderDirection]],
            limit,
            offset,
            attributes: ['id','username','estaActivo','correo','esAdmin','fotoDePerfil','created_at','updated_at']
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

    createUsuario(username, contrasenia, correo, esAdmin, estaActivo, fotoDePerfil) {
        return super.create({username, contrasenia, correo, esAdmin, estaActivo, fotoDePerfil,});
    };

    listUsuarios(page, pageSize, search, orderBy, orderDirection) {
        return this.listUsuariosPaginated({
            page, pageSize, search,
            searchFields: ['username', 'correo'],
            orderBy, orderDirection,
        });
    }

    findUsuarioByEmail(email) {
        return super.findOneWhere(where(fn("LOWER", col("correo")), Op.eq, email));
    }

    findUsuarioByUsername(username) {
        return super.findOneWhere(where(fn("LOWER", col("username")), Op.eq, username));
    }
}

module.exports = UsuarioRepository;
