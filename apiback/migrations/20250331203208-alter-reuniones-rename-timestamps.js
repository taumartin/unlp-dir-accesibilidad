'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn('reuniones', 'createdAt', 'created_at');
        await queryInterface.renameColumn('reuniones', 'updatedAt', 'updated_at');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn('reuniones', 'created_at', 'createdAt');
        await queryInterface.renameColumn('reuniones', 'updated_at', 'updatedAt');
    }
};
