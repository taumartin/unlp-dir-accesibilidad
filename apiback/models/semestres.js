'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Semestres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Semestres.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    esPrimerSemestre: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true,
      field: 'es_primer_semestre',
    },
  }, {
    sequelize,
    modelName: 'Semestres',
    tableName: 'semestres',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [{
      unique:true,
      fields: ['anio','es_primer_semestre'],
    }]
  });
  return Semestres;
};