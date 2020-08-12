const Users = require("../../Models/user");
const getUser = require("../../Validation/jwttoken");
const btoa = require("btoa");

const genID = () =>{
    return btoa(Math.random()*10000).substring(0,8);
}

const resolver = {
  Mutation: {
    requestforApproval: async (_, { message, department ,username}, { req }) => {
      const token = req.cookies["token"];
      const Validuser = await getUser(token);

      if (!Validuser) throw new Error("Not Authorized");

      const user = await Users.findOne({ email: Validuser.email });
      if (user.role === "Admin") throw Error("Already Admin");

      const UniId = genID();
      try {
        await Users.findOneAndUpdate(
          { role: "Admin",department ,username},
          {
            $push: {
              "Requests.pending": {
                  id:UniId,
                message: `${user.username + " " + message}`,
              },
            },
          }
        );
        await Users.findOneAndUpdate(
          { email: Validuser.email },
          { $push: { "Requests.pending": { id:UniId,message } } }
        );
        return user;
      } catch (err) {
        throw new Error("Server Error");
      }
    },
  },
};
module.exports = resolver;
