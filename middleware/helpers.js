const parser = require('body-parser'),
db = require('../models/index');


// GET /api/todos
module.exports.getTodos = (req, res) => {
    db.Todo.find({})
    .then(todos => {
        res.json(todos);
    })
    .catch(e => {
        res.send('Oops, could not retrieve todos!\n' + e);
    })
}

// POST /api/todos
module.exports.createTodo = (req, res) => {
db.Todo.create(req.body)
.then(todo => {
    res.status(201).json(todo)
})
.catch(e => {
    res.send('Oops, could not create todo!\n' + e);
})
}

// GET /api/todos/:todoId
module.exports.getTodo = (req, res) => {
    db.Todo.findById(req.params.todoId)
    .then(todo => {
        res.json(todo)
    })
    .catch(e => {
        res.send('Oops, could not find todo!\n' + e);
    })
}

// PUT /api/todos/:todoId
module.exports.updateTodo = (req, res) => {
    db.Todo.findById(req.params.todoId)
    .then(todo => {
        todo.completed = !todo.completed;
        todo.save();
        res.json(todo)
    })
    .catch(e => {
        res.send('Oops, could not update todo!\n' + e);
    })
}

// DELETE /api/todos/:todoId
module.exports.deleteTodo = (req, res) => {
    db.Todo.findByIdAndRemove(req.params.todoId)
    .then(todo => {
        res.send('Deleted todo \n' + todo);
    })
    .catch(e => {
        res.send('Oops, could not delete todo!\n' + e);
    })
}