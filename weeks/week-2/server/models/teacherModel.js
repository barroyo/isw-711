const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacher = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  cedula: { type: String },
  age: { type: Number }
});

module.exports = mongoose.model('teachers', teacher);