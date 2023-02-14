const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String },
  description: { type: String }
});

module.exports = {
  "model" : mongoose.model('teams', teamSchema),
  "schema": teamSchema
}