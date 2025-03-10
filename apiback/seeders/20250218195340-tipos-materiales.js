'use strict';

const _NOMBRES_TIPOS_MATERIALES = ["Video", "Texto", "Presentación"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        const transaction = await queryInterface.sequelize.transaction();
        try {
            const existingNames = (await queryInterface.sequelize.query('SELECT nombre FROM tipos_materiales',
                {type: Sequelize.QueryTypes.SELECT, transaction}))
                .map(record => record.nombre);
            const tiposMaterialesSeed = _NOMBRES_TIPOS_MATERIALES
                .map(nombre => ({nombre, created_at: now, updated_at: now}))
                .filter(tipoMaterial => !existingNames.includes(tipoMaterial.nombre));
            if (tiposMaterialesSeed.length > 0) {
                await queryInterface.bulkInsert('tipos_materiales', tiposMaterialesSeed, {transaction});
            }
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('tipos_materiales', {nombre: _NOMBRES_TIPOS_MATERIALES}, {});
    }
};
