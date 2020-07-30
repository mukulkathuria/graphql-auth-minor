const Users = require("../../Models/user");
const resolver = {
    Query:{
        getDistDepart:async () =>{
            return await Users.distinct("department");
        }
    }
}
module.exports = resolver;