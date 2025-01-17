const {Sequelize} = require('sequelize');

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;
const sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${name}`);

module.exports.dbConnection = sequelize;
