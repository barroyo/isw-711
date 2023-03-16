import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const playerSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  age: { type: Number, required: false }
});
export const playerModel = mongoose.model('players', playerSchema);
