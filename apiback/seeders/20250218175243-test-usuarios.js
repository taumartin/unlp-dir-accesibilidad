'use strict';
const {fakerES_MX} = require('@faker-js/faker');
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const faker = fakerES_MX;
const {Usuario} = require('../models');

const SEED_LENGTH = 1_000;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const {count} = await Usuario.findAndCountAll();
            const seedCount = Math.max(0, SEED_LENGTH - count);
            const emails = faker.helpers.uniqueArray(faker.internet.email, seedCount);
            const nombres = faker.helpers.uniqueArray(() => faker.person.lastName(), seedCount);
            const now = new Date();
            const usuariosSeed = [];
            for (let i = 0; i < seedCount; i++) {
              const foto=(Math.random()>0.5)?faker.image.avatar():""
              usuariosSeed.push({
                    contrasenia: faker.internet.password(),
                    nombre: nombres[i],
                    correo: emails[i],
                    esta_activo: faker.datatype.boolean(),
                    es_admin: faker.datatype.boolean(0.1),
                    foto_de_perfil: foto,
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
