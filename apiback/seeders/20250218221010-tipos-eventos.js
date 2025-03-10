'use strict';

const _NOMBRES_TIPOS_EVENTOS = ["Examen", "Inicio de clases"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        const transaction = await queryInterface.sequelize.transaction();
        try {
            const existingNames = (await queryInterface.sequelize.query('SELECT nombre FROM tipos_eventos',
                {type: Sequelize.QueryTypes.SELECT, transaction}))
                .map(record => record.nombre);
            const tiposEventosSeed = _NOMBRES_TIPOS_EVENTOS
                .map(nombre => ({nombre, created_at: now, updated_at: now}))
                .filter(tipoEvento => !existingNames.includes(tipoEvento.nombre));
            if (tiposEventosSeed.length > 0) {
                await queryInterface.bulkInsert('tipos_eventos', tiposEventosSeed, {transaction});
            }
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('tipos_eventos', {nombre: _NOMBRES_TIPOS_EVENTOS}, {});
    }
};
