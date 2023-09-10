const Todo = require('../models/Todo');

exports.addTodo = async (req, res) => {
  const newTodo = new Todo({
    task: req.body.todo
  });

  await newTodo.save();

  res.json({ message: 'Todo added successfully' });
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

exports.deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  await Todo.findByIdAndDelete(todoId);
  res.json({ message: 'Todo deleted successfully' });
};