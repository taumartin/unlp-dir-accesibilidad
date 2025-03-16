'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Apoyo extends Model {
        static associate(models) {
            Apoyo.belongsTo(models.Semestre, {
                as: 'semestre',
                foreignKey: 'semestreId',
            });
            Apoyo.belongsTo(models.Tutor, {
                as: 'tutor',
                foreignKey: 'tutorId',
            });
            Apoyo.belongsTo(models.Alumno, {
                as: 'alumno',
                foreignKey: 'alumnoId',
            });
        }
    }

    Apoyo.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        tutorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'tutor_id',
            references: {
                model: 'tutores',
                key: 'id',
            }
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
    }, {
        sequelize,
        modelName: 'Apoyo',
        tableName: 'apoyos',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [{
            unique: true,
            fields: ['semestreId', 'alumnoId', 'tutorId'],
        }]
    });
    return Apoyo;
};
