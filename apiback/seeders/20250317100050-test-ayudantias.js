'use strict';
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const {Ayudantia, Materia, Tutor, Semestre} = require("../models");
const {fakerES_MX} = require("@faker-js/faker");
const faker = fakerES_MX;

const SEED_LENGTH = 250;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const ayudantias = await Ayudantia.findAndCountAll();
            let seedCount = Math.max(0, SEED_LENGTH - ayudantias.count);
            if (seedCount === 0) {
                return;
            }
            const materias = await Materia.findAll({attributes: ['id']});
            const tutores = await Tutor.findAll({attributes: ['id']});
            const semestres = await Semestre.findAll({attributes: ['id']});
            if ((materias.length === 0) || (tutores.length === 0) || (semestres.length === 0)) {
                return;
            }
            const ayudantiasExistentes = new Set(
                ayudantias.rows.map(ayudantia => `${ayudantia.semestre_id}-${ayudantia.tutor_id}-${ayudantia.materia_id}`)
            );
            const ayudantiasSeed = new Set();
            while (ayudantiasSeed.size < seedCount) {
                const semestre = faker.helpers.arrayElement(semestres);
                const tutor = faker.helpers.arrayElement(tutores);
                const materia = faker.helpers.arrayElement(materias);
                const key = `${semestre.id}-${tutor.id}-${materia.id}`;
                if (!ayudantiasExistentes.has(key) && !ayudantiasSeed.has(key)) {
                    ayudantiasSeed.add(key);
                }
            }
            if (ayudantiasSeed.size) {
                const now = new Date();
                const insertData = [...ayudantiasSeed].map(key => {
                    const [semestreId, tutorId, materiaId] = key.split('-').map(Number);
                    return {
                        semestre_id: semestreId,
                        tutor_id: tutorId,
                        materia_id: materiaId,
                        created_at: now,
                        updated_at: now,
                    };
                });
                return queryInterface.bulkInsert(Ayudantia.tableName, insertData, {});
            }
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete(Ayudantia.tableName, null, {});
        });
    }
};
