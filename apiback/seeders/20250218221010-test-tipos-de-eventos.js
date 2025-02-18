'use strict';
const {runSeedOnlyInEnv} = require("../utils/seed_runners");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const now = new Date();
            const tiposDeEventosesSeed = [{
                nombre: "Examen",
                created_at: now,
                updated_at: now,
            },
            {
                nombre: "Inicio de clases",
                created_at: now,
                updated_at: now,
            }
          ]
            await queryInterface.bulkDelete('tipos_eventos',null,{}) //Borro los registros anteriores para reemplazarlos con estos.
            return queryInterface.bulkInsert('tipos_eventos', tiposDeEventosesSeed, {});
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete('tipos_eventos', null, {});
        });
    }
};
