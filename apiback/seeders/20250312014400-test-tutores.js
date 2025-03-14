'use strict';
const {fakerES_MX} = require('@faker-js/faker');
const faker = fakerES_MX;
const {Tutor, Persona, Usuario} = require('../models');
const {runSeedOnlyInEnv} = require("../utils/seed_runners");

const SEED_LENGTH = 500;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const {count} = await Tutor.findAndCountAll();
            let seedCount = Math.max(0, SEED_LENGTH - count);
            if (seedCount === 0) {
                return;
            }
            const personasSinTutores = await Persona.findAndCountAll({
                attributes: ['id'],
                include: [{
                    model: Tutor,
                    as: 'tutor',
                    required: false, // LEFT JOIN
                    attributes: [],
                }],
                where: {
                    '$tutor.id$': null // Sin Tutor.
                }
            });
            const usuariosSinTutores = await Usuario.findAndCountAll({
                attributes: ['id'],
                include: [{
                    model: Tutor,
                    as: 'tutor',
                    required: false, // LEFT JOIN
                    attributes: [],
                }],
                where: {
                    '$tutor.id$': null // Sin tutor.
                }
            });
            seedCount = Math.min(seedCount, personasSinTutores.count, usuariosSinTutores.count);
            if (seedCount === 0) {
                return;
            }
            const now = new Date();
            const tutoresSeed = [];
            for (let i = 0; i < seedCount; i++) {
                tutoresSeed.push({
                    persona_id: personasSinTutores.rows[i].id,
                    usuario_id: usuariosSinTutores.rows[i].id,
                    horas_asignadas: faker.number.int({min: 2, max: 8}),
                    created_at: now,
                    updated_at: now,
                });
            }
            if (tutoresSeed.length) {
                return queryInterface.bulkInsert(Tutor.tableName, tutoresSeed, {});
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete(Tutor.tableName, null, {});
        });
    }
};
