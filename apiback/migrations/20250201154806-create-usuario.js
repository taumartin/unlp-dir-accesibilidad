'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
          type: Sequelize.STRING(32),
          allowNull: false,
          unique: true,
      },
      estaActivo: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          field: 'esta_activo',
          defaultValue: true,
      },
      contrasenia: {
          type: Sequelize.STRING(255),
          allowNull: false,
      },
      correo: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
      },
      esAdmin:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          field: 'es_admin',
          defaultValue: false,
      },
      fotoDePerfil:{
          type: Sequelize.STRING(255),
          field: 'foto_de_perfil',
      },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'created_at',
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
