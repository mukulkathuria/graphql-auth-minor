const typeDefs = `
type Requests{
    approved:[String]
    reject:[String]
    pending:[String]
}
type groupDepart{
    _id:roledepart
}
type roledepart{
        department:String
        role:String
        username:String
}
`;

module.exports = typeDefs;
