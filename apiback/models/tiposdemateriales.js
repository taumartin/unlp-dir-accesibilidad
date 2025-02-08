'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TiposDeMateriales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TiposDeMateriales.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
    nombre: {
      type: DataTypes.STRING(20), //Los tipos son "video", "texto" y "presentación".
      allowNull: false,
      unique:true,
    }
  }, {
    sequelize,
    modelName: 'TiposDeMateriales',
    tableName: 'tipos_de_materiales',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return TiposDeMateriales;
};