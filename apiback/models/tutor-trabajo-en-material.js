'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TutorTrabajoEnMaterial extends Model {
        static associate(models) {
            TutorTrabajoEnMaterial.belongsTo(models.Tutor, {
                as: 'tutor',
                foreignKey: 'tutorId',
            });
            TutorTrabajoEnMaterial.belongsTo(models.MaterialAccesibilizado, {
                as: 'materialAccesibilizado',
                foreignKey: 'materialAccesibilizadoId',
            });
        }
    }

    TutorTrabajoEnMaterial.init({
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
        materialAccesibilizadoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'material_accesibilizado_id',
            references: {
                model: 'materiales_accesibilizados',
                key: 'id',
            }
        },
        minutosTrabajados: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'minutos_trabajados',
            validate: {
                min: 1,
                max: 1440,
            }
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'TutorTrabajoEnMaterial',
        tableName: 'tutores_trabajos_en_materiales',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return TutorTrabajoEnMaterial;
};
