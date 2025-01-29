'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Alumno extends Model {
        static associate(models) {
            Alumno.belongsTo(models.Persona, {
                as: 'persona',
                foreignKey: 'personaId',
            });
        }
    }

    Alumno.init({
        id: DataTypes.INTEGER,
        personaId: DataTypes.INTEGER,
        legajo: DataTypes.STRING,
        tieneCertificado: DataTypes.BOOLEAN,
        situacion: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Alumno',
        tableName: 'alumnos',
    });

    return Alumno;
};
