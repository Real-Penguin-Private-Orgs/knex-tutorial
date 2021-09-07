require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS
    },
    migrations: {
      directory: './db/knex_migrations'
    },
    seeds: {
      directory: './db/knex_seeds'
    }
  },
};
