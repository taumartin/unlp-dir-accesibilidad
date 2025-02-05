'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventosParaDireccion extends Model {
    static associate(models) {
      EventosParaDireccion.belongsTo(models.Eventos, {
        as: 'eventos',
        foreignKey: 'eventoId',
    });
    }
  }
  EventosParaDireccion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'evento_id',
      unique:true,
      references: {
          model: 'Eventos',
          key: 'id',
      }
    },
    lugar: {
      type:DataTypes.STRING(100),
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'EventosParaDireccion',
    tableName: 'eventos_para_direccion',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return EventosParaDireccion;
};