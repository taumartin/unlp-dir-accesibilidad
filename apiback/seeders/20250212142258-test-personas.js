'use strict';
const {fakerES_MX} = require('@faker-js/faker');
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const faker = fakerES_MX;
const {Persona} = require('../models');

const SEED_LENGTH = 1_000;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const {count} = await Persona.findAndCountAll();
            const seedCount = Math.max(0, SEED_LENGTH - count);
            const emails = faker.helpers.uniqueArray(faker.internet.email, seedCount);
            const dnis = faker.helpers.uniqueArray(() => faker.number.bigInt({
                min: 10_000_000, max: 99_999_999
            }), seedCount);
            const now = new Date();
            const personasSeed = [];
            for (let i = 0; i < seedCount; i++) {
                personasSeed.push({
                    nombre: faker.person.firstName(),
                    apellido: faker.person.lastName(),
                    dni: dnis[i],
                    telefono: faker.phone.number(),
                    email: emails[i],
                    created_at: now,
                    updated_at: now,
                });
            }
            return queryInterface.bulkInsert('personas', personasSeed, {});
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete('personas', null, {});
        });
    }
};
