const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  quantity: { type: Number },
  name: { type: String },
  price: { type: Number }
});

const ProductModel = mongoose.model('products', ProductSchema);

module.exports = {
  model: ProductModel,
  schema: ProductSchema
}