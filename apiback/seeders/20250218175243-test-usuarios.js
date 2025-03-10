'use strict';
const {fakerES_MX} = require('@faker-js/faker');
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const faker = fakerES_MX;
const {Usuario} = require('../models');
const {hashPassword} = require("../utils/hash");

const SEED_LENGTH = 1_000;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const {count} = await Usuario.findAndCountAll();
            const seedCount = Math.max(0, SEED_LENGTH - count);
            const emails = faker.helpers.uniqueArray(faker.internet.email, seedCount);
            const usernames = faker.helpers.uniqueArray(() => faker.internet.username(), seedCount);
            const now = new Date();
            const usuariosSeed = [];
            const testPasswordForAll = await hashPassword("Password1234");
            for (let i = 0; i < seedCount; i++) {
                usuariosSeed.push({
                    contrasenia: testPasswordForAll,
                    username: usernames[i].slice(0, 31).toLowerCase(),
                    correo: emails[i].toLowerCase(),
                    esta_activo: faker.datatype.boolean(),
                    es_admin: faker.datatype.boolean(0.1),
                    foto_perfil: (Math.random() > 0.5) ? faker.image.avatar() : null,
                    created_at: now,
                    updated_at: now,
                });
            }
            if (usuariosSeed.length) {
                return queryInterface.bulkInsert('usuarios', usuariosSeed, {});
            }
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete('usuarios', null, {});
        });
    }
};
