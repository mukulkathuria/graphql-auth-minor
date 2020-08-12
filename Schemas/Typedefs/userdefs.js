const typeDefs = `
type User{
    username:String!
    email:String!
    role:String!
    department:String!
    Requests:Requests
  }
  type CurrentUser{
    currentUser:User
  }
  type loginUser{
    token:String
  }
`;

module.exports = typeDefs;
