'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventosParaAlumnos extends Model {
    static associate(models) {
      EventosParaAlumnos.belongsTo(models.Eventos, {
          as: 'eventos',
          foreignKey: 'eventoId',
      });

      Ayudantias.belongsTo(models.TiposDeEventos,{
          as: 'tipos_de_eventos',
          foreignKey: 'tipoDeEventoId',
      });

      Ayudantias.belongsTo(models.Materia,{
          as: 'materia',
          foreignKey: 'materiaId'
      })
  }
  }
  EventosParaAlumnos.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  eventoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    field: 'evento_id',
    references: {
        model: 'Eventos',
        key: 'id',
    }
  },
  tipoDeEventoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'tipo_de_evento_id',
    references: {
        model: 'TiposDeEventos',
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
  }, {
    sequelize,
    modelName: 'EventosParaAlumnos',
    tableName: 'eventos_para_alumnos',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return EventosParaAlumnos;
};