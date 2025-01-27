const {dbConnection} = require('../config/db');
import {DataTypes} from 'sequelize';

const Persona = dbConnection.define('Persona', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
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
        legajo: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        telefono: {
            type: DataTypes.STRING(25),
            allowNull: false,
            defaultValue: '',
        },
        mail: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: 'personas',
    },
);

module.exports.Persona = Persona;
