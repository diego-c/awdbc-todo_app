const express = require('express'),
dotenv = require('dotenv').config()
mongoose = require('mongoose'),
db = require('./models/index'),
app = express(),
override = require('method-override'),
path = require('path'),
parser = require('body-parser'),
router = require('./routes/crud');
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(override('_method'));

// GET /
app.get('/', (req, res) => {
    db.Todo.find({})
    .then(todos => {
        res.render('index', {todos: todos});
    })
    .catch(e => res.send('Oops, could not fetch your todos from the database! :( \n' + e));
})

// routes /api/todos/etc
app.use('/api/todos', router);

app.listen(3000, () => console.log(`running todos api on port ${port}`));