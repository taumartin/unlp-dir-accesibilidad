'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('semestres_alumnos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    observaciones: {
      type:Sequelize.TEXT,
      allowNull:false,
      defaultValue:"",
    },
    alumnoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'alumno_id',
      references: {
          model: 'alumnos',
          key: 'id',
      }
    },
    semestreId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'semestre_id',
      references: {
          model: 'semestres',
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

    await queryInterface.addIndex('semestres_alumnos', ['semestre_id', 'alumno_id'], {
      unique: true,
      name: 'unique_semestre_id_alumno_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('semestres_alumnos', 'unique_semestre_id_alumno_id');
    await queryInterface.dropTable('semestres_alumnos');
  }
};
