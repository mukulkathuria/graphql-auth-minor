const Users = require("../../Models/user");
const resolver = {
  Query: {
    getAllAdmin: async () => {
      return await Users.find(
        {
          role: "Admin",
        },
        { username: "$username", department: "$department" }
      );
    },
  },
};
module.exports = resolver;
