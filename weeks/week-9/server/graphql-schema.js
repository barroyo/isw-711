const { buildSchema } = require('graphql');
exports.schema = buildSchema(`
  type Query {
    getCourses: [Course]
    getCourse(id: String!): Course
    searchCourses(name: String!, sort: String): [Course]
    generateImage(prompt: String!): [String]
  }

  type Mutation {
    createCourse(name: String!, credits: Int!, teacher: TeacherInput): Course
  }

  type Course {
    _id: ID!
    name: String
    credits: Int
    teacher: Teacher
  }

  type Teacher {
    _id: ID!
    first_name: String!
    last_name: String!
    cedula: String!
    age: Int
  }

  input TeacherInput {
    first_name: String!
    last_name: String!
    cedula: String!
    age: Int
  }

  `);