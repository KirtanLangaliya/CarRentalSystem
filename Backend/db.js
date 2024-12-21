const mongoose = require("mongoose");
require("dotenv").config();
MONGO_URI = process.env.MONGO_URI;

function connectDB() {
  mongoose.connect(MONGO_URI);

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("Mongo DB Connection Successfull");
  });

  connection.on("error", () => {
    console.log("Mongo DB Connection Error");
  });
}

connectDB();

module.exports = mongoose;
