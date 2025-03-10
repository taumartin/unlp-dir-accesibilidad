'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MaterialAccesibilizado extends Model {
        static associate(models) {
            MaterialAccesibilizado.belongsTo(models.TipoMaterial, {
                as: 'tipoMaterial',
                foreignKey: 'tipoMaterialId',
            });
            MaterialAccesibilizado.belongsTo(models.Materia, {
                as: 'materia',
                foreignKey: 'materiaId',
            });
        }
    }

    MaterialAccesibilizado.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tipoMaterialId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'tipo_material_id',
            references: {
                model: 'tipos_materiales',
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
        fechaPublicacion: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'fecha_publicacion',
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '',
        },
        link: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'MaterialAccesibilizado',
        tableName: 'materiales_accesibilizados',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return MaterialAccesibilizado;
};
