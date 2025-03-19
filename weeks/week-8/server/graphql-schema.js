const { buildSchema } = require('graphql');
exports.schema = buildSchema(`
  type Query {
    getAllCourses: [Course]
    searchCourses(name: String!, sort: String): [Course]
    hello: String
    version: String
  }

  type Course {
    _id: ID!
    name: String,
    credits: Int,
    teacher: Teacher
  }

  type Teacher {
    _id: ID!,
    first_name: String!,
    last_name: String!,
    cedula: String!,
    age: Int
  }

  `);