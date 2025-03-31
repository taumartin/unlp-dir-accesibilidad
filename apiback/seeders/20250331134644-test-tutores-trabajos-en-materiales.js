'use strict';
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const {MaterialAccesibilizado, TutorTrabajoEnMaterial, Tutor} = require("../models");
const {fakerES_MX} = require("@faker-js/faker");
const faker = fakerES_MX;

const SEED_LENGTH = 200;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const trabajosEnMateriales = await TutorTrabajoEnMaterial.findAndCountAll();
            let seedCount = Math.max(0, SEED_LENGTH - trabajosEnMateriales.count);
            if (seedCount === 0) {
                return;
            }
            const tutores = await Tutor.findAll({attributes: ['id']});
            const materiales = await MaterialAccesibilizado.findAll({attributes: ['id']});
            if ((tutores.length === 0) || (materiales.length === 0)) {
                return;
            }
            const now = new Date();
            const trabajosEnMaterialesSeed = [];
            for (let i = 0; i < seedCount; i++) {
                const timestamp = faker.date.recent({days: 365});
                timestamp.setHours(0, 0, 0, 0);
                trabajosEnMaterialesSeed.push({
                    tutor_id: faker.helpers.arrayElement(tutores).id,
                    material_accesibilizado_id: faker.helpers.arrayElement(materiales).id,
                    minutos_trabajados: faker.number.int({min: 1, max: 1440}),
                    fecha: timestamp,
                    created_at: now,
                    updated_at: now,
                });
            }
            if (trabajosEnMaterialesSeed.length) {
                return queryInterface.bulkInsert(TutorTrabajoEnMaterial.tableName, trabajosEnMaterialesSeed, {});
            }
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete(TutorTrabajoEnMaterial.tableName, null, {});
        });
    }
};
