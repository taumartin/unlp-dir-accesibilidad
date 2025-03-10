'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EventoAlumnos extends Model {
        static associate(models) {
            EventoAlumnos.belongsTo(models.Evento, {
                as: 'evento',
                foreignKey: 'eventoId',
            });

            EventoAlumnos.belongsTo(models.TipoEvento, {
                as: 'tipoEvento',
                foreignKey: 'tipoEventoId',
            });

            EventoAlumnos.belongsTo(models.Materia, {
                as: 'materia',
                foreignKey: 'materiaId'
            });
        }
    }

    EventoAlumnos.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        eventoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            field: 'evento_id',
            references: {
                model: 'eventos',
                key: 'id',
            }
        },
        tipoEventoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'tipo_evento_id',
            references: {
                model: 'tipos_eventos',
                key: 'id',
            }
        },
        materiaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'materia_id',
            references: {
                model: 'materias',
                key: 'id',
            }
        },
    }, {
        sequelize,
        modelName: 'EventoAlumnos',
        tableName: 'eventos_alumnos',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return EventoAlumnos;
};
