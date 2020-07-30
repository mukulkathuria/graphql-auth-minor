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
    getDistDepart: [String]
  }
  type Mutation {
    createUser(
      username: String!
      email: String!
      password: String!
      role: String!
    ): User
    loginUser(email: String!, password: String!): loginUser
    requestforApproval(message:String!,department:String!): UserwithReq
    requestReject(reqid:ID!) :UserwithReq
    requestApproval(reqid:ID!): UserwithReq
  }
`;

const appolloserver = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [typeDefs, Userdef,RequesDef],
    resolvers,
  }),
  context: ({ req, res }) => ({ req, res }),
});

module.exports = appolloserver;
