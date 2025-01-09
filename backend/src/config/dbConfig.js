const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB

const dbConnection = () => {
  try {
    mongoose
      .connect(process.env.DB_CONNECTION_STRING)
      .then(console.log("MongoDB connected successfully."))
      .catch("mongodb connection is not successfull ");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = dbConnection;
