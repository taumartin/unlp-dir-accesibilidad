'use strict';

const _NOMBRES_MEDIOS_COMUNICACION = ["E-mail", "WhatsApp", "Teléfono", "Presencial", "Videollamada"];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        const transaction = await queryInterface.sequelize.transaction();
        try {
            const existingNames = (await queryInterface.sequelize.query('SELECT nombre FROM medios_comunicacion',
                {type: Sequelize.QueryTypes.SELECT, transaction}))
                .map(record => record.nombre);
            const mediosComunicacionSeed = _NOMBRES_MEDIOS_COMUNICACION
                .map(nombre => ({nombre, created_at: now, updated_at: now}))
                .filter(tipoEvento => !existingNames.includes(tipoEvento.nombre));
            if (mediosComunicacionSeed.length > 0) {
                await queryInterface.bulkInsert('medios_comunicacion', mediosComunicacionSeed, {transaction});
            }
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('medios_comunicacion', {nombre: _NOMBRES_MEDIOS_COMUNICACION}, {});
    }
};
