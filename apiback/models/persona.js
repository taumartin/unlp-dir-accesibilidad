'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Persona extends Model {
        static associate(models) {
            Persona.hasOne(models.Tutor, {
                as: 'tutor',
                foreignKey: 'personaId'
            });
        }

        getNombreCompleto() {
            return [this.nombre, this.apellido].join(' ');
        }
    }

    Persona.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        telefono: {
            type: DataTypes.STRING(25),
            allowNull: false,
            defaultValue: '',
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        modelName: 'Persona',
        tableName: 'personas',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Persona;
};
