'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SemestreAlumno extends Model {
        static associate(models) {
            SemestreAlumno.belongsTo(models.Alumno, {
                as: 'alumno',
                foreignKey: 'alumnoId',
            });

            SemestreAlumno.belongsTo(models.Semestre, {
                as: 'semestre',
                foreignKey: 'semestreId',
            });
        }
    }

    SemestreAlumno.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "",
        },
        alumnoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'alumno_id',
            references: {
                model: 'alumnos',
                key: 'id',
            }
        },
        semestreId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'semestre_id',
            references: {
                model: 'semestres',
                key: 'id',
            }
        },
    }, {
        sequelize,
        modelName: 'SemestreAlumno',
        tableName: 'semestres_alumnos',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [{
            unique: true,
            fields: ['alumno_id', 'semestre_id'],
        }]
    });
    return SemestreAlumno;
};
