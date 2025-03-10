'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn('usuarios', 'nombre', 'username');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn('usuarios', 'username', 'nombre');
    }
};
