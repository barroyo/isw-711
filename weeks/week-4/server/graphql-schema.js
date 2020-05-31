const { buildSchema } = require('graphql');
exports.graphQLschema = buildSchema(`
  type Query {
    orders: [Order]
    getOrder(orderId: Int!): Order
    hello: String
  }

  type Mutation {
    addClient(name: String!, lastName: String! ): Client
  }

  type Order {
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