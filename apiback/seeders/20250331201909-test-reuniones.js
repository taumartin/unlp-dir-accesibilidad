'use strict';
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const {Tutor, MedioComunicacion, Reunion, Alumno, Materia} = require("../models");
const {fakerES_MX} = require("@faker-js/faker");
const faker = fakerES_MX;

const SEED_LENGTH = 300;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            const reuniones = await Reunion.findAndCountAll();
            let seedCount = Math.max(0, SEED_LENGTH - reuniones.count);
            if (seedCount === 0) {
                return;
            }
            const tutores = await Tutor.findAll({attributes: ['id']});
            const mediosComunicacion = await MedioComunicacion.findAll({attributes: ['id']});
            const alumnos = await Alumno.findAll({attributes: ['id']});
            const materias = await Materia.findAll({attributes: ['id']});
            if ((tutores.length === 0) || (mediosComunicacion.length === 0) || (alumnos.length === 0) || (materias.length === 0)) {
                return;
            }
            const now = new Date();
            const reunionesSeed = [];
            for (let i = 0; i < seedCount; i++) {
                const timestamp = faker.date.recent({days: 365});
                timestamp.setSeconds(0);
                timestamp.setMilliseconds(0);
                reunionesSeed.push({
                    medio_comunicacion_id: faker.helpers.arrayElement(mediosComunicacion).id,
                    tutor_id: faker.helpers.arrayElement(tutores).id,
                    alumno_id: faker.helpers.arrayElement(alumnos).id,
                    materia_id: (Math.random() < 0.1) ? null : faker.helpers.arrayElement(materias).id, // 10% NULLS.
                    fecha_y_hora: timestamp,
                    observaciones: faker.lorem.sentences({min: 0, max: 3}),
                    created_at: now,
                    updated_at: now,
                });
            }
            if (reunionesSeed.length) {
                return queryInterface.bulkInsert(Reunion.tableName, reunionesSeed, {});
            }
        });
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete(Reunion.tableName, null, {});
        });
    }
};
