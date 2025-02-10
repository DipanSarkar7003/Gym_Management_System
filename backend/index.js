const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./src/config/dbConfig");
const memberRoute = require("./src/routes/memberRoute");
const trainerRoute = require("./src/routes/trainerRoute");
const paymentRoute = require("./src/routes/paymentRoute");
const cors = require("cors");
const {protect} = require("./src/controllers/authController.js")

console.log(protect)
// Initialize Express and load environment variables
dotenv.config();
const app = express();

app.use(cors());
// Database connection
dbConnection();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running!",
  });
});

// Routes
app.use("/v1/api", memberRoute);
app.use("/v1/api",  trainerRoute);
app.use("/v1/api", paymentRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
