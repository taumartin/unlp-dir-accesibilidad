'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SemestresDeAlumnos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    observaciones: {
      type:Sequelize.TEXT,
      allowNull:false,
      default:"",
    },
    alumnoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'alumno_id',
      references: {
          model: 'Alumno',
          key: 'id',
      }
    },
    semestreId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'semestre_id',
      references: {
          model: 'Semestres',
          key: 'id',
      }
  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:'updated_at'
      }
    });

    await queryInterface.addIndex('semestres_de_alumnos', ['semestre_id', 'alumno_id'], {
      unique: true,
      name: 'unique_semestre_id_alumno_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('SemestresDeAlumnos', 'unique_semestre_id_alumno_id');
    await queryInterface.dropTable('SemestresDeAlumnos');
  }
};