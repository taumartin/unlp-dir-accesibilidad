'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Persona extends Model {
        static associate(models) {
            // None.
        }

        getNombreCompleto() {
            return [this.nombre, this.apellido].join(' ');
        }
    }

    Persona.init({
        id: DataTypes.INTEGER,
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        dni: DataTypes.INTEGER,
        telefono: DataTypes.STRING,
        email: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Persona',
        tableName: 'personas',
    });
    return Persona;
};
