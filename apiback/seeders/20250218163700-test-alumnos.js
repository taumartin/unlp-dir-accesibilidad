'use strict';

const { fakerES_MX } = require('@faker-js/faker');
const { runSeedOnlyInEnv } = require("../utils/seed_runners");
const faker = fakerES_MX;
const { Alumno, Persona } = require('../models');

const SEED_LENGTH = 1_000;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return runSeedOnlyInEnv("development", async () => {
      const personas= await Persona.findAll();


      const { count } = await Alumno.findAndCountAll();
      const seedCount = Math.max(0, SEED_LENGTH - count);
      const legajos = faker.helpers.uniqueArray(() => {
        return faker.string.numeric({ length: 5, allowLeadingZeros: false }) + "/" + faker.string.numeric({ length: 1, allowLeadingZeros: false }) 
      }, seedCount);
      const now = new Date();
      const legajosSeed = [];
      for (let i = 0; i < seedCount && personas.length>0 ; i++) {
        let persona=personas.splice(Math.floor(Math.random()*personas.length),1)[0]
        legajosSeed.push({
          legajo: legajos[i],
          tiene_certificado: faker.datatype.boolean(),
          situacion: faker.lorem.sentences({min:0,max:3}),
          persona_id: persona.id,
          created_at: now,
          updated_at: now,
        });
      }
      if (legajosSeed.length) {
        return queryInterface.bulkInsert('alumnos', legajosSeed, {});
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return runSeedOnlyInEnv("development", async () => {
      return queryInterface.bulkDelete('alumnos', null, {});
    });
  }
};
