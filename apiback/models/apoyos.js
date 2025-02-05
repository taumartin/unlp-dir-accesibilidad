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

      Apoyos.belongsTo(models.Tutor,{
          as: 'tutor',
          foreignKey: 'tutorId',
      })

      Apoyos.belongsTo(models.Alumno,{
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
      field: 'semestre_id',
      references: {
          model: 'Semestres',
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
  alumnoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'alumno_id',
    references: {
        model: 'Alumno',
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