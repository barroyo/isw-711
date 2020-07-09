const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const product = require('../models/productModel');
const client = require('../models/clientModel');

const order = new Schema({
  client: client.schema,
  products: [product.schema],
});

module.exports = mongoose.model('orders', order);