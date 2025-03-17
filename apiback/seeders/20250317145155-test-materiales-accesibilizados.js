'use strict';
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const {MaterialAccesibilizado, Materia, TipoMaterial} = require("../models");
const {fakerES_MX} = require("@faker-js/faker");
const faker = fakerES_MX;

const SEED_LENGTH = 300;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const materiales = await MaterialAccesibilizado.findAndCountAll();
            let seedCount = Math.max(0, SEED_LENGTH - materiales.count);
            if (seedCount === 0) {
                return;
            }
            const materias = await Materia.findAll({attributes: ['id']});
            const tiposMateriales = await TipoMaterial.findAll({attributes: ['id']});
            if ((materias.length === 0) || (tiposMateriales.length === 0)) {
                return;
            }
            const now = new Date();
            const materialesSeed = [];
            const links = faker.helpers.uniqueArray(() => `${faker.internet.url({appendSlash: false})}${faker.system.filePath()}`.substring(0, 255), seedCount);
            for (let i = 0; i < seedCount; i++) {
                const timestamp = faker.date.recent({days: 365});
                timestamp.setSeconds(0);
                timestamp.setMilliseconds(0);
                materialesSeed.push({
                    tipo_material_id: faker.helpers.arrayElement(tiposMateriales).id,
                    materia_id: faker.helpers.arrayElement(materias).id,
                    fecha_publicacion: timestamp,
                    titulo: faker.company.catchPhrase().substring(0, 100),
                    link: links[i],
                    created_at: now,
                    updated_at: now,
                });
            }
            if (materialesSeed.length) {
                return queryInterface.bulkInsert(MaterialAccesibilizado.tableName, materialesSeed, {});
            }
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete(MaterialAccesibilizado.tableName, null, {});
        });
    }
};
