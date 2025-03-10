'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('reuniones', 'materia_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'materias',
                key: 'id',
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('reuniones', 'materia_id');
    }
};
