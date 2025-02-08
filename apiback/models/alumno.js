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
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        personaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            field: 'persona_id',
            references: {
                model: 'Persona',
                key: 'id',
            }
        },
        legajo: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        tieneCertificado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'tiene_certificado',
            defaultValue: false,
        },
        situacion: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '',
        },
    }, {
        sequelize,
        modelName: 'Alumno',
        tableName: 'alumnos',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Alumno;
};
