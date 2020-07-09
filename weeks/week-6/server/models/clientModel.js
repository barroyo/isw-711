const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: { type: String },
  lastName: { type: String },
  email: { type: String },
  website: { type: String },
});

const ClientModel = mongoose.model('clients', ClientSchema);

module.exports = {
  schema: ClientSchema,
  model: ClientModel
}