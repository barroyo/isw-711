const { buildSchema } = require('graphql');
exports.graphQLschema = buildSchema(`
  type Query {
    orders: [Order]
    clients: [Client]
    getOrder(orderId: Int!): Order
    hello: String
  }

  type Mutation {
    addClient(name: String!, lastName: String!, email: String ): Client
    addOrder(clientId: String!, productId: String!): Order
    addProduct(name: String!): Product
  }

  type Order {
    id: ID!
    client: Client!
    products: [Product!]
  }

  type Client {
    id: ID!
    name: String!
    lastName: String!
    email: String
    website: String
  }

  type Product {
    id: ID!
    quantity: Int!
    name: String!
    price: Float!
  }`);