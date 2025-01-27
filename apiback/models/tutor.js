import {Persona} from "./persona";
import {DataTypes} from 'sequelize';

const {dbConnection} = require('../config/db');

const Tutor = dbConnection.define('Tutor', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        personaId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'persona_id',
            references: {
                model: Persona,
                key: 'id',
            }
        },
        horasAsignadas: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 0,
            field: 'horas_asignadas',
        },
    }, {
        tableName: 'tutores',
    },
);

module.exports.Tutor = Tutor;
