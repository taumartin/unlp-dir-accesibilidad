'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('materialesAccesibilizados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipoDeMaterialId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          field: 'tipo_de_material_id',
          references: {
              model: 'tiposDeMaterial',
              key: 'id',
          }
      },
      fechaDePublicacion: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'fecha_de_publicacion',
      },
      titulo: {
        type: Sequelize.STRING(100),
        allowNull: false,
        default: '',
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('materialesAccesibilizados');
  }
};