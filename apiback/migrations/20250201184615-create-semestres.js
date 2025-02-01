'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Semestres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      anio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      esPrimerSemestre: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });

    await queryInterface.addIndex('Semestres', ['anio', 'esPrimerSemestre'], {
      unique: true,
      name: 'unique_anio_esPrimerSemestre'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Semestres', 'unique_anio_esPrimerSemestre');
    await queryInterface.dropTable('Semestres');
  }
};