const {
  ApolloServer,
  gql,
  makeExecutableSchema,
} = require("apollo-server-express");

//Schemas or typedefs
const Userdef = require("./Typedefs/userdefs");
const RequesDef = require("./Typedefs/requestdef");

//Resolvers module
const resolvers = require("./Rootresolvers");

// Schemas for graphql
const typeDefs = gql`
  type Query {
    hello: String
    getUser: CurrentUser
    getAllAdmin:[ groupDepart ]
  }
  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      role: String!
    ): User
    loginUser(email: String!, password: String!): loginUser
    requestforApproval(
      message: String!
      department: String!
      username: String!
    ): User
    requestReject(reqid: ID!): User
    requestApproval(reqid: ID!): User
  }
`;

const appolloserver = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [typeDefs, Userdef, RequesDef],
    resolvers,
  }),
  context: ({ req, res }) => ({ req, res }),
});

module.exports = appolloserver;
