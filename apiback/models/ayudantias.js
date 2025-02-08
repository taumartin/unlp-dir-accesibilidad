'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ayudantias extends Model {
    static associate(models) {
      Ayudantias.belongsTo(models.Semestres, {
          as: 'semestres',
          foreignKey: 'semestreId',
      });

      Ayudantias.belongsTo(models.Tutor,{
          as: 'tutor',
          foreignKey: 'tutorId',
      });

      Ayudantias.belongsTo(models.Materia,{
          as: 'materia',
          foreignKey: 'materiaId'
      })
  }
  }
  Ayudantias.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    semestreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'semestre_id',
      references: {
          model: 'Semestres',
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
    modelName: 'Ayudantias',
    tableName: 'ayudantias',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [{
      unique:true,
      fields: ['tutor_id','semestre_id','materia_id'],
    }]
  });
  return Ayudantias;
};