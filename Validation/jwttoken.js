const jwttoken = require("jsonwebtoken");
require("dotenv").config();

const getUser = (token) => {
  try {
    if (token) {
      return jwttoken.verify(token, process.env.ACCESS_TOKEN);
    }
    return null;
  } catch (err) {
    return null;
  }
};
module.exports = getUser;
