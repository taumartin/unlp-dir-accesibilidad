'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reunion extends Model {
        static associate(models) {
            Reunion.belongsTo(models.MedioComunicacion, {
                as: 'medioComunicacion',
                foreignKey: 'medioComunicacionId',
            });
            Reunion.belongsTo(models.Tutor, {
                as: 'tutor',
                foreignKey: 'tutorId',
            });
            Reunion.belongsTo(models.Materia, {
                as: 'materia',
                foreignKey: 'materiaId',
            });
            Reunion.belongsTo(models.Alumno, {
                as: 'alumno',
                foreignKey: 'alumnoId',
            });
        }
    }

    Reunion.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        medioComunicacionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'medio_comunicacion_id',
            references: {
                model: 'medios_comunicacion',
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
        materiaId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'materia_id',
            references: {
                model: 'materias',
                key: 'id',
            }
        },
        fechaYHora: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'fecha_y_hora'
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '',
        },
    }, {
        sequelize,
        modelName: 'Reunion',
        tableName: 'reuniones',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [{
            unique: true,
            fields: ['tutor_id', 'fecha_y_hora'],
        }]
    });
    return Reunion;
};
