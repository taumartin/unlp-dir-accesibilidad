import {Persona} from "./persona";
import {DataTypes} from 'sequelize';

const {dbConnection} = require('../config/db');

const Alumno = dbConnection.define('Alumno', {
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
        tieneCertificado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'tiene_certificado',
        },
        situacion: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '',
        },
    }, {
        tableName: 'alumnos',
    },
);

module.exports.Alumno = Alumno;
