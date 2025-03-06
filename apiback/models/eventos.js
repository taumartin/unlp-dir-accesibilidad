'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Eventos extends Model {
    }

    Eventos.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fechaYHora: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'fecha_y_hora'
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false, //Atributo opcional.
            defaultValue: "",
        },
    }, {
        sequelize,
        modelName: 'Eventos',
        tableName: 'eventos',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Eventos;
};
