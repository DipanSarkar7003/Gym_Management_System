const express = require("express");
const app = express();
require("dotenv").config();
const dbConnection = require("./config/dbConfig");

app.get("/", function (req, res) {
  res.status(200).json({
    message: "Server is on !",
  });
});

dbConnection();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
