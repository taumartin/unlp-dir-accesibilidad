'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ayudantias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      semestreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'semestre_id',
        references: {
            model: 'Semestres',
            key: 'id',
        }
      },
      materiaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'materia_id',
        references: {
            model: 'Materia',
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

    await queryInterface.addIndex('ayudantias', ['tutor_id', 'semestre_id','materia_id'], {
      unique: true,
      name: 'unique_tutor_id_semestre_id_materia_id'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Ayudantias', 'unique_tutor_id_semestre_id_materia_id');
    await queryInterface.dropTable('Ayudantias');
  }
};