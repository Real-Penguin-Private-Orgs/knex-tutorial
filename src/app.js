const express = require('express')
const app = express();
const knex = require('./knex')
const morgan = require('morgan');
const tableNames = require('./constants/tableNames');

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async(req, res) => {
    let data = await knex.select('*').from(tableNames.posts);
    res.json(data);
})

app.post('/post', (req, res, next) => {
    let { title } = req.body;
    if(!title) return res.json({message: 'Title is required'})

    knex(tableNames.posts).insert({title: title})
    .then((response) => {
        res.json(response)
    })
    .catch((err) => {
        next(err)
    })
})
 
app.put('/:id', async(req, res, next) => {
    let { id } = req.params;
    let { title } = req.body;

    if(!title) return res.json({message: 'Title is required'})

    knex(tableNames.posts)
    .where('id', '=', id)
    .update({ title: title })
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        next(err);
    })
})

app.delete('/:id', async(req, res, next) => {
    let { id } = req.params;
    if(!id) return res.status(404);

    knex(tableNames.posts)
    .where({ id: id })
    .del()
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        console.error(err)
    })
})

app.get('/:id', async(req, res, next) => {
    let { id } = req.params;
    if(!id) return res.status(404);

    let data = await knex(tableNames.posts).where('id', id)
    res.json(data)
})

module.exports = app;