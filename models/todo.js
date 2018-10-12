// todo.js

const mongoose = require('mongoose')

const Todo = mongoose.model('Todo', {
  title: String,
  description: String
});

module.exports = Todo
