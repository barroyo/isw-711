import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const teamSchema = new Schema({
  name: { type: String },
  description: { type: String }
});
export const teamModel = mongoose.model('teams', teamSchema);
