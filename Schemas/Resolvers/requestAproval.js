const Users = require("../../Models/user");
const getUser = require("../../Validation/jwttoken");

const resolver = {
  Mutation: {
    requestApproval: async (_, { reqid }, { req }) => {
      const token = req.cookies["token"];
      const user = getUser(token);
      if (!user) throw Error("UnAuthorized");

      const AdminUser = await Users.findOne({ email: user.email });
      if (AdminUser.role !== "Admin") throw Error("UnAuthenticated User");

      try {
        await Users.updateMany(
          { "Requests.pending.id": reqid },
          {
            $pull: { "Requests.pending": { id: reqid } },
            $push: {
              "Requests.approved": {
                id: reqid,
                message: "Request has been  Approved",
              },
            },
          }
        );
        return AdminUser;
      } catch (err) {
        throw new Error("Server Error");
      }
    },
  },
};
module.exports = resolver;
