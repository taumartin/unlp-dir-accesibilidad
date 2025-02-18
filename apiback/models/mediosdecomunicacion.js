'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MediosDeComunicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MediosDeComunicacion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
    nombre: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'MediosDeComunicacion',
    tableName: 'medios_comunicacion',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return MediosDeComunicacion;
};