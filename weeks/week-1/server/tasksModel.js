const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema({
  title: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('tasks', task);