// activity.js

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Activity = mongoose.model('Activity', {
  title: String,
  content: String,
  todoId: { type: Schema.Types.ObjectId, ref: 'Todo' }
});

module.exports = Activity
