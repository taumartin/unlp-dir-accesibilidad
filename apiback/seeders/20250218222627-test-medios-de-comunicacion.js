'use strict';
const {runSeedOnlyInEnv} = require("../utils/seed_runners");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const now = new Date();
            const mediosDeComunicacionSeed = [{
                nombre: "Mail",
                created_at: now,
                updated_at: now,
            },
            {
                nombre: "WhatsApp",
                created_at: now,
                updated_at: now,
            },
            {
                nombre: "Teléfono",
                created_at: now,
                updated_at: now,
            },
            {
                nombre: "Presencial",
                created_at: now,
                updated_at: now,
            },
            {
                nombre: "Videollamada",
                created_at: now,
                updated_at: now,
            }
          ]
            await queryInterface.bulkDelete('medios_comunicacion',null,{}) //Borro los registros anteriores para reemplazarlos con estos.
            return queryInterface.bulkInsert('medios_comunicacion', mediosDeComunicacionSeed, {});
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete('medios_comunicacion', null, {});
        });
    }
};
