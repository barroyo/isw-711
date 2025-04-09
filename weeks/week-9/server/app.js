require('dotenv').config();
const express = require("express")
const { createHandler } = require("graphql-http/lib/use/express")
const { ruruHTML } = require("ruru/server")
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB_CONNECTION_STRING);

const {
  courseGet, courseCreate
} = require("./controllers/courseController.js");

const {
  createImage
} = require("./controllers/openAiController.js");


// Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String,
//     version: String
//   }
// `)
const { schema } = require('./graphql-schema.js');

// The root provides a resolver function for each API endpoint
const root = {
  getCourses: async () => {
    const courses = await courseGet();
    return courses;
  },
  getCourse: async (args) => {
    const { id } = args;
    const course = await courseGet( id );
    return course;
  },
  generateImage: async (args) => {
    return await createImage(args);
  },
  createCourse: async (args) => {
    const { name, credits, teacher } = args;
    const course = await courseCreate({ name, credits, teacher });
    return course;
  },
}

const app = express()

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql and client at http://localhost:4000/") // eslint-disable-line no-console