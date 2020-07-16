const express = require('express');
const graphqlHTTP = require('express-graphql');
const uuid = require('uuid/v4');
const { graphQLschema } = require('./graphql-schema.js');
const Order = require('./models/orderModel');
const Client = require('./models/clientModel');
const Product = require('./models/productModel');
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api");


// functions
const getClient = (request) => {
  return Client.model.findById(request.query.id, function (err, order) {
    if (err) {
      return `There was an error quering order with id ${request.query.id}`
    }
    return order;
  })
}

const getClients = () => {
  return Client.model.find(function (err, clients) {
    if (err) {
      return "There was an error"
    }
    return clients;
  })
};

const getOrders = () => {
  return Order.find(function (err, orders) {
    if (err) {
      return "There was an error"
    }
    return orders;
  })
};

const addClient = (req) => {
  const client = new Client.model();
  client.name = req.name;
  client.lastName = req.lastName;
  client.email = req.email;

  client.save();
  return client;
}

const addProduct = (req) => {
  const product = new Product.model();
  product.name = req.name;

  product.save();
  return product;
}

const addOrder = async (req) => {
  const client = await Client.model.findById({ _id: req.clientId }).exec();
  const product = await Product.model.findById({ _id: req.productId }).exec();

  const order = new Order()

  order.client = client;
  order.products.push(product)
  order.save()

  return order;
}


// expose in the root element the different entry points of the
// graphQL service
const root = {
  getOrder: (req, res) => getOrder(req),
  orders: (req, res) => getOrders(req),
  getClient: async (id) => getClient(req),
  clients: () => {
    return getClients();
  },
  addClient: (req) => addClient(req),
  addProduct: (req) => addProduct(req),
  addOrder: (req) => addOrder(req),
};

// instance the expressJS app
const app = express();
// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

//one single endpoint different than REST
app.use('/graphql', graphqlHTTP({
  schema: graphQLschema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));