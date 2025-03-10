'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MedioComunicacion extends Model {
        static associate(models) {
            // None.
        }
    }

    MedioComunicacion.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'MedioComunicacion',
        tableName: 'medios_comunicacion',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return MedioComunicacion;
};
