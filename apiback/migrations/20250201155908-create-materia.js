'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('materias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      docentes: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue:'',
      },
      contacto: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue:"",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:'updated_at',
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('materias');
  }
};
