'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Semestre extends Model {
        static associate(models) {
            // None.
        }
    }

    Semestre.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        anio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        esPrimerSemestre: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: 'es_primer_semestre',
        },
    }, {
        sequelize,
        modelName: 'Semestre',
        tableName: 'semestres',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [{
            unique: true,
            fields: ['anio', 'es_primer_semestre'],
        }]
    });
    return Semestre;
};
