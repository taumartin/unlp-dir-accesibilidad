'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('reuniones', 'alumno_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'alumnos',
                key: 'id',
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('reuniones', 'alumno_id');
    }
};
