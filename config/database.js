// config/database.js
require('dotenv').config();          // if you’re using dotenv
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,              // database name
  process.env.DB_USER,              // username
  process.env.DB_PASS,              // password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,                 // set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;