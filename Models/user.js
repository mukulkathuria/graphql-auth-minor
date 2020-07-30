const mongoose = require("mongoose");

const users = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    department:{
      type:String,
      default:"IT"
    },
    Requests:{
      approved:[{
        id:String,
        message:String,
      }],
      pending:[{
        id:String,
        message:String,
      }],
      reject:[{
        id:String,
        message:String,
      }]
    },
    role: {
      type: String,
      required: true,
    },
  },
  { collection: "users" }
);
module.exports = mongoose.model("Users", users);
