'use strict';

const _SEMESTRES = [
    {anio: 2025, es_primer_semestre: true},
    {anio: 2025, es_primer_semestre: false},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        const transaction = await queryInterface.sequelize.transaction();
        try {
            const existingSemestres = await queryInterface.sequelize.query('SELECT anio, es_primer_semestre FROM semestres',
                {type: Sequelize.QueryTypes.SELECT, transaction});
            const semestresSeed = _SEMESTRES
                .map(semestre => ({
                    anio: semestre.anio,
                    es_primer_semestre: semestre.es_primer_semestre,
                    created_at: now,
                    updated_at: now
                }))
                .filter(semestre => existingSemestres.find(s => (s.anio === semestre.anio)
                    && (s.es_primer_semestre === semestre.es_primer_semestre)) === undefined);
            if (semestresSeed.length > 0) {
                await queryInterface.bulkInsert('semestres', semestresSeed, {transaction});
            }
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface, Sequelize) {
        const anios = _SEMESTRES.map(semestre => semestre.anio)
        return queryInterface.bulkDelete('semestres', {
            anio: anios
        }, {});
    }
};
