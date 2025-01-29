'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tutores', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            personaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'persona_id',
                unique: true,
                references: {
                    model: 'personas',
                    key: 'id',
                }
            },
            horasAsignadas: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 0,
                field: 'horas_asignadas',
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tutores');
    }
};
