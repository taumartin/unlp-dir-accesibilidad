'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reuniones extends Model {
    static associate(models) {
      Reuniones.belongsTo(models.MediosDeComunicacion, {
          as: 'medios_de_comunicacion',
          foreignKey: 'mediosDeComunicacionId',
      });

      Reuniones.belongsTo(models.Tutor,{
          as: 'tutor',
          foreignKey: 'tutorId',
      })

      Reuniones.belongsTo(models.Materia,{
          as: 'materia',
          foreignKey: 'materiaId',
      })
  }
  }
  Reuniones.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
    mediosDeComunicacionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'medios_de_comunicacion_id',
      references: {
          model: 'MediosDeComunicacion',
          key: 'id',
      }
  },
  tutorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'tutor_id',
      references: {
          model: 'Tutor',
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
    fechaYHora: {
      type:DataTypes.DATE,
      allowNull: false,
      field: 'fecha_y_hora'
    },
  }, {
    sequelize,
    modelName: 'Reuniones',
    tableName: 'reuniones',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [{
      unique:true,
      fields: ['tutor_id','fecha_y_hora'],
    }]
  });
  return Reuniones;
};