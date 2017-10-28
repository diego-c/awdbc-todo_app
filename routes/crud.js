const express = require('express'),
router = express.Router({mergeParams: true}),
helpers = require('../middleware/helpers');

// GET /api/todos
//POST /api/todos
router.route('/')
.get(helpers.getTodos)
.post(helpers.createTodo);

// GET /api/todos/:todoId
// PUT /api/todos/:todoId
// DELETE /api/todos/:todoId
router.route('/:todoId')
.get(helpers.getTodo)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo)
router.get('/:todoId', helpers.getTodo)

module.exports = router;
