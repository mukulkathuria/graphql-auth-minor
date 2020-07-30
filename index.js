const express = require("express");
const server = require("./Schemas/rootSchema");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");

require("dotenv").config();

// start the server
const app = express();
app.use(cookieparser());

server.applyMiddleware({ app });

//Connecting to mongoDB
mongoose.connect(
  process.env.URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(4000, () => {
      console.log(` Graphql server is started on ${server.graphqlPath}`);
    });
  }
);
