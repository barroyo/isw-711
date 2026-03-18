const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const { createYoga, createSchema } = require('graphql-yoga');

const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
const { buildContext } = require('./graphql/context');

mongoose.connect('mongodb://127.0.0.1:27017/utnapi');
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();

//middlewares
app.use(cors({
  domains: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: buildContext,
  graphqlEndpoint: '/graphql',
  maskedErrors: false,
});

// GraphQL endpoint (replaces all REST routes)
app.use('/graphql', yoga);

//start the app
app.listen(3001, () => console.log(`UTN API service listening on port 3001!`))
