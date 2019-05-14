const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || "4000";
const db_url = "mongodb+srv://s-root:ZvYjZewUqWZQ6xW@scluster-yrgct.mongodb.net/test?retryWrites=true";

const {
  GraphQLSchema
} = require("graphql")

// Connect to MongoDB with Mongoose.
mongoose.connect(
    db_url,
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
// check if connection with the db is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));


const schema = new GraphQLSchema({});
app.use("/graphql", cors(), bodyParser.json(), expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));