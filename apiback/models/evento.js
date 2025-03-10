'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Evento extends Model {
    }

    Evento.init({
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
            allowNull: false,
            defaultValue: "",
        },
    }, {
        sequelize,
        modelName: 'Evento',
        tableName: 'eventos',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Evento;
};
