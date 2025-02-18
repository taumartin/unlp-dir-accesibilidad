'use strict';
const {runSeedOnlyInEnv} = require("../utils/seed_runners");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const now = new Date();
            const tiposDeMaterialesSeed = [{
                nombre: "Video",
                created_at: now,
                updated_at: now,
            },
            {
                nombre: "Texto",
                created_at: now,
                updated_at: now,
            },
            {
                nombre: "Presentación",
                created_at: now,
                updated_at: now,
            }]
            await queryInterface.bulkDelete('tipos_materiales',null,{}) //Borro los registros anteriores para reemplazarlos con estos.
            return queryInterface.bulkInsert('tipos_materiales', tiposDeMaterialesSeed, {});
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete('tipos_materiales', null, {});
        });
    }
};
