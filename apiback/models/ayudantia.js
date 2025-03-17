'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ayudantia extends Model {
        static associate(models) {
            Ayudantia.belongsTo(models.Semestre, {
                as: 'semestre',
                foreignKey: 'semestreId',
            });
            Ayudantia.belongsTo(models.Tutor, {
                as: 'tutor',
                foreignKey: 'tutorId',
            });
            Ayudantia.belongsTo(models.Materia, {
                as: 'materia',
                foreignKey: 'materiaId'
            });
        }
    }

    Ayudantia.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        semestreId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'semestre_id',
            references: {
                model: 'semestres',
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
        modelName: 'Ayudantia',
        tableName: 'ayudantias',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [{
            unique: true,
            fields: ['tutor_id', 'semestre_id', 'materia_id'],
        }]
    });
    return Ayudantia;
};
