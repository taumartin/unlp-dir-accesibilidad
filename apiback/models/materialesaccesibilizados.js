'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaterialesAccesibilizados extends Model {
    static associate(models) {
      MaterialesAccesibilizados.belongsTo(models.TiposDeMateriales, {
        as: 'tipoDeMaterial',
        foreignKey: 'tipoDeMaterialId',
    });
    MaterialesAccesibilizados.belongsTo(models.Materia, {
      as: 'materia',
      foreignKey: 'materiaId',
  });
    }
  }
  MaterialesAccesibilizados.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipoDeMaterialId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'tipo_de_material_id',
        references: {
            model: 'TiposDeMateriales',
            key: 'id',
        }
    },
    materiaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'materia_id',
        references: {
            model: 'Materia',
            key: 'id',
        }
    },
    fechaDePublicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'fecha_de_publicacion',
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      default: '',
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'MaterialAccesibilizado',
    tableName: 'material_accesibilizado',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return MaterialesAccesibilizados;
};