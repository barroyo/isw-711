const express = require('express');
const graphqlHTTP = require('express-graphql');
const uuid = require('uuid/v4');
const { graphQLschema } = require('./graphql-schema.js')

// test data (for testing purposes)
// this might be replaced by real database structures
let clients = [];
let orders = [{
  client: {
    id: uuid(),
    name: "John",
    lastName: "Doe"
  },
  products: [
    {
      id: uuid(),
      name: "Product 1",
      quantity: 2,
      price: 100
    }
  ]
}]

// functions
const getOrder = (request) => {
  return orders[request.orderId];
}
const addClient = (client) => {
  // generate the uid
  const id = uuid();
  // create the client object
  const newClient = {
    id,
    name: client.name,
    lastName: client.lastName
  };
  // add client to the clients array
  clients[id] = newClient;

  // es6-way
  // clients[id] = { ...client, id };

  return clients[id];

}

// expose in the root element the different entry points of the
// graphQL service
const root = {
  hello: () => 'Hello world from GraphQL!',
  getOrder: (req) => getOrder(req),
  addClient: (req) => addClient(req),
  orders: () => Object.values(orders),
  clients: () => Object.values(clients)
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