'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TipoMaterial extends Model {
        static associate(models) {
            // None.
        }
    }

    TipoMaterial.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'TipoMaterial',
        tableName: 'tipos_materiales',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return TipoMaterial;
};
