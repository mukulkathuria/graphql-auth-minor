const loginresolver = require("./Resolvers/login");
const registerresolver = require("./Resolvers/registeruser");
const departresolver = require("./Resolvers/department");
const requestresolver = require("./Resolvers/requests");
const rejectRequest = require("./Resolvers/rejectRequest");
const requestAproved = require("./Resolvers/requestAproval");

const { merge } = require("lodash");
// its resolver for graphql server when we trigger the query it shows this

module.exports = merge(
  loginresolver,
  registerresolver,
  departresolver,
  requestresolver,
  rejectRequest,
  requestAproved,
);
