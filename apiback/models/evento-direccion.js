'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EventoDireccion extends Model {
        static associate(models) {
            EventoDireccion.belongsTo(models.Evento, {
                as: 'evento',
                foreignKey: 'eventoId',
            });
        }
    }

    EventoDireccion.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        eventoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'evento_id',
            unique: true,
            references: {
                model: 'eventos',
                key: 'id',
            }
        },
        lugar: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'EventoDireccion',
        tableName: 'eventos_direccion',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return EventoDireccion;
};
