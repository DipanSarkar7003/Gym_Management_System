const Trainer = require("../models/trainerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// LOGIN AS TRAINER OR ADMIN

const trainerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if trainer with same email  exists
    const validTrainer = await Trainer.findOne({
      email,
    });
    if (!validTrainer) {
      return res.status(401).json({ message: "Invalid credentials EMAIL" });
    }

    // Check if password matches
    console.log(password)

    const isMatch = await bcrypt.compare(password, validTrainer.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials PASS" });
    }

    //   assign JWT token

    const token = jwt.sign({ id: validTrainer._id }, process.env.JWT_SECRET);

    //   sending the response

    res.status(200).json({
      ok: true,
      message: "Login successful",
      token,
      trainer: validTrainer,
    });
  } catch (error) {
    console.log("Error in trainer login", error);
    res.status(500).json({
      ok: false,
      message: "Error in trainer login",
      error: error.message,
    });
  }
};

// protect middleware for authorization

const protect = async (req, res, next) => {
  let token;

  try {
    // Get the token from the request header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token, return immediately
    if (!token) {
      return res.status(403).json({
        ok: false,
        message: "Token not provided",
      });
    }

    // Verify the token
    let jwtData;
    try {
      jwtData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        ok: false,
        message: "Invalid or expired token",
        error: error.message,
      });
    }

    // Check if trainer still exists
    const trainer = await Trainer.findById(jwtData.id);

    if (!trainer) {
      return res.status(403).json({
        ok: false,
        message: "Authorization denied, Trainer not exist",
      });
    }

    req.trainer = trainer;
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Error in token verification", error);
    res.status(500).json({
      ok: false,
      message: "Server error during authentication",
      error: error.message,
    });
  }
};

module.exports = { trainerLogin, protect };
