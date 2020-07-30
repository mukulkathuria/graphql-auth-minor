const Users = require("../../Models/user");
const bcrypt = require("bcrypt");
const register = require("../../Validation/user");

const resolver = {
  Mutation: {
    createUser: async (_, { username, email, password, role }) => {
      const { error } = register.registerValid.validate({
        username,
        email,
        password,
        role,
      });
      if (error) return new Error(error.details[0].message);

      const user = await Users.findOne({ email: email });
      if (user) return new Error("Email already exists");

      // hashed pass
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const createuser = new Users({
        username: username,
        email: email,
        password: hashed,
        role: role,
      });
      try {
        const created = await createuser.save();
        return { username: createuser.username, email: createuser.email };
      } catch (err) {
        return new Error("Server error");
      }
    },
  },
};
module.exports = resolver;
