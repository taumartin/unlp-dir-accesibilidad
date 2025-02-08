'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reuniones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaYHora: {
        type: Sequelize.DATE,
        allowNull: false,
        field:'fecha_y_hora',
      },
      mediosDeComunicacionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'medios_de_comunicacion_id',
        references: {
            model: 'MediosDeComunicacion',
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('reuniones', ['tutor_id', 'fecha_y_hora'], {
      unique: true,
      name: 'unique_tutor_id_fecha_y_hora'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Reuniones', 'unique_tutor_id_fecha_y_hora');
    await queryInterface.dropTable('Reuniones');
  }
};