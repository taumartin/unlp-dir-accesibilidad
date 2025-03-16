'use strict';
const {fakerES_MX} = require('@faker-js/faker');
const faker = fakerES_MX;
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const {Apoyo, Alumno, Tutor, Semestre} = require('../models');

const SEED_LENGTH = 250;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const apoyos = await Apoyo.findAndCountAll();
            let seedCount = Math.max(0, SEED_LENGTH - apoyos.count);
            if (seedCount === 0) {
                return;
            }
            const alumnos = await Alumno.findAll({attributes: ['id']});
            const tutores = await Tutor.findAll({attributes: ['id']});
            const semestres = await Semestre.findAll({attributes: ['id']});
            if ((alumnos.length === 0) || (tutores.length === 0) || (semestres.length === 0)) {
                return;
            }
            const apoyosExistentes = new Set(
                apoyos.rows.map(apoyo => `${apoyo.semestre_id}-${apoyo.alumno_id}-${apoyo.tutor_id}`)
            );
            const apoyosSeed = new Set();
            while (apoyosSeed.size < seedCount) {
                const semestre = faker.helpers.arrayElement(semestres);
                const tutor = faker.helpers.arrayElement(tutores);
                const alumno = faker.helpers.arrayElement(alumnos);
                const key = `${semestre.id}-${alumno.id}-${tutor.id}`;
                if (!apoyosExistentes.has(key) && !apoyosSeed.has(key)) {
                    apoyosSeed.add(key);
                }
            }
            if (apoyosSeed.size) {
                const now = new Date();
                const insertData = [...apoyosSeed].map(key => {
                    const [semestreId, alumnoId, tutorId] = key.split('-').map(Number);
                    return {
                        semestre_id: semestreId,
                        tutor_id: tutorId,
                        alumno_id: alumnoId,
                        created_at: now,
                        updated_at: now,
                    };
                });
                return queryInterface.bulkInsert(Apoyo.tableName, insertData, {});
            }
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete(Apoyo.tableName, null, {});
        });
    }
};
