let enviroment = process.env.NODE_ENV || "development";
const knexConfig = require('../knexfile')[enviroment];
module.exports = require('knex')(knexConfig);