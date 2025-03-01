'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TiposDeEventos extends Model {
  }
  TiposDeEventos.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type:DataTypes.STRING(17), // FIXME: esta dimensión es quizás muy conservadora, evaluar.
      allowNull:false,
      unique:true
    },
  }, {
    sequelize,
    modelName: 'TiposDeEventos',
    tableName: 'tipos_eventos',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return TiposDeEventos;
};
