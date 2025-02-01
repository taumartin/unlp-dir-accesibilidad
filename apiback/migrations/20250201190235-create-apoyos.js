'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Apoyos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      semestreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        field: 'semestre_id',
        references: {
            model: 'semestres',
            key: 'id',
        }
      },
      tutorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        field: 'tutor_id',
        references: {
            model: 'tutores',
            key: 'id',
        }
    },
    alumnoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      field: 'alumno_id',
      references: {
          model: 'alumnos',
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

    await queryInterface.addIndex('Apoyos', ['tutorId', 'alumnoId','semestreId'], {
      unique: true,
      name: 'unique_tutorId_alumnoid_semestre_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Apoyos', 'unique_tutorId_alumnoid_semestre_id');
    await queryInterface.dropTable('Apoyos');
  }
};