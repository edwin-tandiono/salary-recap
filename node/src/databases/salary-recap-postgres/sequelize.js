const _ = require('lodash');
const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  process.env.SALARY_RECAP_POSTGRESQL_DATABASE,
  process.env.SALARY_RECAP_POSTGRESQL_USERNAME,
  process.env.SALARY_RECAP_POSTGRESQL_PASSWORD,
  {
    host: process.env.SALARY_RECAP_POSTGRESQL_HOST,
    port:  process.env.SALARY_RECAP_POSTGRESQL_PORT,
    dialect: 'postgres',
  },
);
