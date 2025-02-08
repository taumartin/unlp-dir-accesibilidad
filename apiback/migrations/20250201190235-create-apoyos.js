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
        field: 'semestre_id',
        references: {
            model: 'Semestres',
            key: 'id',
        }
      },
      tutorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'tutor_id',
        references: {
            model: 'Tutor',
            key: 'id',
        }
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

    await queryInterface.addIndex('apoyos', ['tutor_id', 'alumno_id','semestre_id'], {
      unique: true,
      name: 'unique_tutor_id_alumno_id_semestre_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Apoyos', 'unique_tutor_id_alumno_id_semestre_id');
    await queryInterface.dropTable('Apoyos');
  }
};