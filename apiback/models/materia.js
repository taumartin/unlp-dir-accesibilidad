'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Materia.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    docentes: {
      type: DataTypes.TEXT,
      allowNull: false,
      default: '',
    },
    contacto: {
      type: DataTypes.TEXT,
      allowNull: false,
      default: "",
    },
  }, {
      sequelize,
      modelName: 'Materia',
      tableName: 'materias',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
  });
  return Materia;
};
