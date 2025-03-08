'use strict';
const {fakerES_MX} = require('@faker-js/faker');
const {runSeedOnlyInEnv} = require("../utils/seed_runners");
const faker = fakerES_MX;
const {Semestres} = require('../models');

const SEED_LENGTH = 104;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
            const {count} = await Semestres.findAndCountAll();
            const seedCount = Math.max(0, SEED_LENGTH - count)/2+1999;
            const now = new Date();
            const semestresSeed = [];
            const inicio=1999+count/2
            for (let i=inicio; i < seedCount; i=i+.5) {
              const anio=Math.floor(i)
              const sem=i%1===0
              semestresSeed.push({
                    anio:anio,
                    es_primer_semestre: sem,
                    created_at: now,
                    updated_at: now,
                });
            }
            if (semestresSeed.length) {
                return queryInterface.bulkInsert('semestres', semestresSeed, {});
            }
    },

    async down(queryInterface, Sequelize) {
        return runSeedOnlyInEnv("development", async () => {
            return queryInterface.bulkDelete('semestres', null, {});
        });
    }
};
