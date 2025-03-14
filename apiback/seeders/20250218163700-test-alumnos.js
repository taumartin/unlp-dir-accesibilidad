'use strict';
const {fakerES_MX} = require('@faker-js/faker');
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const faker = fakerES_MX;
const {Alumno, Persona} = require('../models');

const SEED_LENGTH = 500;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const {count} = await Alumno.findAndCountAll();
            let seedCount = Math.max(0, SEED_LENGTH - count);
            if (seedCount === 0) {
                return;
            }
            const personasSinAlumnos = await Persona.findAndCountAll({
                attributes: ['id'],
                include: [{
                    model: Alumno,
                    as: 'alumno',
                    required: false, // LEFT JOIN
                    attributes: [],
                }],
                where: {
                    '$alumno.id$': null // Sin Alumno.
                }
            });
            seedCount = Math.min(seedCount, personasSinAlumnos.count);
            if (seedCount === 0) {
                return;
            }
            const legajos = faker.helpers.uniqueArray(() => {
                return faker.string.numeric({
                    length: {min: 4, max: 6},
                    allowLeadingZeros: false
                }) + "/" + faker.string.numeric();
            }, seedCount);
            const now = new Date();
            const alumnosSeed = [];
            for (let i = 0; i < seedCount; i++) {
                alumnosSeed.push({
                    persona_id: personasSinAlumnos.rows[i].id,
                    legajo: legajos[i],
                    tiene_certificado: faker.datatype.boolean(),
                    situacion: faker.lorem.sentences({min: 0, max: 3}),
                    created_at: now,
                    updated_at: now,
                });
            }
            if (alumnosSeed.length) {
                return queryInterface.bulkInsert(Alumno.tableName, alumnosSeed, {});
            }
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete(Alumno.tableName, null, {});
        });
    }
};
