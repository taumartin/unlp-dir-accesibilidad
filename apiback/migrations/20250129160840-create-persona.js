'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('personas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nombre: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            apellido: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            dni: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            telefono: {
                type: Sequelize.STRING(25),
                allowNull: false,
                defaultValue: '',
            },
            email: {
                type: Sequelize.STRING(100),
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
        await queryInterface.dropTable('personas');
    }
};
