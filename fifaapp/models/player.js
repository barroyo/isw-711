const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./team');

const playerSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  age: { type: Number },
  team: Team.schema
});
const playerModel = mongoose.model('players', playerSchema);

module.exports = {
  "model": playerModel,
  "schema": playerSchema
}