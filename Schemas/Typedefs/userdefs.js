const typeDefs = `
type User{
    username:String
    email:String
  }
  type CurrentUser{
    currentUser:User
  }
  type loginUser{
    token:String
  }
  type UserwithReq{
    username:String
    request:Requests
  }
`;

module.exports = typeDefs;
