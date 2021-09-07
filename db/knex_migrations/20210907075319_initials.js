const tableNames = require("../../src/constants/tableNames");
const {Knex} = require('knex')

/**
 * @param {Knex} knex 
 */
exports.up = async(knex) => {
    await Promise.all([
        knex.schema.createTable(tableNames.posts, (table) => {
                table.increments('id').primary();
                table.string('title', 150).unique().notNullable();
                table.timestamp('created_at').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable(tableNames.questions, (table) => {
            table.increments('id').primary();
            table.string('content', 150).unique().notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    ])
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.error(err)
    })
};

/**
 * @param {Knex} knex 
 */
exports.down = async(knex) => {
    await Promise.all([
        tableNames.posts,
        tableNames.questions
    ].map((tablenames) => knex.schema.dropTableIfExists(tablenames)))
};
