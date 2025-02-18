'use strict';
const {fakerES_MX} = require('@faker-js/faker');
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const faker = fakerES_MX;
const {Eventos} = require('../models');

const SEED_LENGTH = 1_000;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const {count} = await Eventos.findAndCountAll();
            const seedCount = Math.max(0, SEED_LENGTH - count);
            const now = new Date();
            const eventosSeed = [];
            for (let i = 0; i < seedCount; i++) {
                eventosSeed.push({
                    fecha_y_hora: faker.date.future(),
                    descripcion: faker.lorem.sentences({min:0,max:5}),
                    created_at: now,
                    updated_at: now,
                });
            }
            if (eventosSeed.length) {
                return queryInterface.bulkInsert('eventos', eventosSeed, {});
            }
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete('eventos', null, {});
        });
    }
};
