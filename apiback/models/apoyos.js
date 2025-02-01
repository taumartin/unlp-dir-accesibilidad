'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apoyos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Apoyos.belongsTo(models.Semestres, {
        as: 'semestre',
        foreignKey: 'semestreId',
    });

      Apoyos.belongsTo(models,tutor,{
          as: 'tutor',
          foreignKey: 'tutorId',
      })

      Apoyos.belongsTo(models,alumno,{
        as: 'alumno',
        foreignKey: 'alumnoId',
    })
    }
  }
  Apoyos.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    semestreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'semestre_id',
      references: {
          model: 'semestres',
          key: 'id',
      }
    },
    tutorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'tutor_id',
      references: {
          model: 'tutores',
          key: 'id',
      }
  },
  alumnoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    field: 'alumno_id',
    references: {
        model: 'alumnos',
        key: 'id',
    }
  },
  }, {
    sequelize,
    modelName: 'Apoyos',
    tableName: 'apoyos',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [{
      unique:true,
      fields: ['semestreId','alumnoId','tutorId'],
    }]
  });
  return Apoyos;
};