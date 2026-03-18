const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    name: String
    email: String!
  }

  type AuthPayload {
    token: String!
  }

  type Teacher {
    id: ID!
    first_name: String!
    last_name: String!
    age: Int!
    email: String!
  }

  type Course {
    id: ID!
    name: String!
    credits: Int!
    teacher: Teacher
  }

  input CreateTeacherInput {
    first_name: String!
    last_name: String!
    age: Int!
    email: String!
  }

  input CreateCourseInput {
    name: String!
    credits: Int!
    teacherId: ID!
  }

  input UpdateCourseInput {
    name: String
    credits: Int
    teacherId: ID
  }

  type Query {
    me: User
    teachers: [Teacher!]!
    teacher(id: ID!): Teacher
    courses: [Course!]!
    course(id: ID!): Course
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    createTeacher(input: CreateTeacherInput!): Teacher!
    createCourse(input: CreateCourseInput!): Course!
    updateCourse(id: ID!, input: UpdateCourseInput!): Course!
    deleteCourse(id: ID!): Boolean!
  }
`;

module.exports = { typeDefs };

