'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SemestresDeAlumnos extends Model {
    static associate(models) {
      SemestresDeAlumnos.belongsTo(models.Alumno, {
          as: 'semestres_de_alumnos',
          foreignKey: 'semestresDeAlumnosId',
      });

      Reuniones.belongsTo(models.Semestres,{
          as: 'semestre',
          foreignKey: 'semestreId',
      })
  }
  }
  SemestresDeAlumnos.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
    observaciones: {
      type:DataTypes.TEXT,
      allowNull:false,
      default:"",
    },
    alumnoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'alumno_id',
      references: {
          model: 'Alumno',
          key: 'id',
      }
    },
    semestreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'semestre_id',
      references: {
          model: 'Semestres',
          key: 'id',
      }
  },
  }, {
    sequelize,
    modelName: 'SemestresDeAlumnos',
    tableName: 'semestres_de_alumnos',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [{
      unique:true,
      fields: ['alumno_id','semestre_id'],
    }]
  });
  return SemestresDeAlumnos;
};