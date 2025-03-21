'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Materia extends Model {
        static associate(models) {
            // None.
        }
    }

    Materia.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        docentes: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '',
        },
        contacto: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "",
        },
    }, {
        sequelize,
        modelName: 'Materia',
        tableName: 'materias',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Materia;
};
