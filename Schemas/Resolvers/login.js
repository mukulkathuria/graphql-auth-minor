const Users = require("../../Models/user");
const bcrypt = require("bcrypt");
const Joi = require("../../Validation/user");
const jwt = require("jsonwebtoken");
const getUser = require("../../Validation/jwttoken");

require("dotenv").config();

const resolver = {
  Query: {
    getUser: async (_, args, { req }) => {
      const token = req.cookies["token"];
      const user = await getUser(token);
      if (!user) return new Error("Not Authorized");
      const currentuser = await Users.findOne({ email: user.email });
      return {
        currentUser: user,
      };
    },
  },
  Mutation: {
    loginUser: async (_, { email, password }, { res }) => {
      const { error } = Joi.loginvalid.validate({ email, password });
      if (error) throw new Error(error.details[0].message);

      const user = await Users.findOne({ email: email });
      if (!user) throw new Error("Invalid email and password");

      // check the pass
      const isValidPass = await bcrypt.compare(password, user.password);
      if (!isValidPass) throw new Error("Invalid email and password");

      const token = jwt.sign(
        { username: user.username, email: user.email },
        process.env.ACCESS_TOKEN,
        { algorithm: "HS512", expiresIn: "1h" }
      );

      res.cookie("token", token, {
        expiresIn: 60 * 60 * 60,
        httpOnly: true,
        maxAge: 60 * 60 * 60,
      });
      return {
        token: token,
      };
    },
  },
};

module.exports = resolver;
