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
    console.log(email, password);

    // Check if trainer with same email  exists
    const validTrainer = await Trainer.findOne({
      email,
    });
    if (!validTrainer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password matches

    const isMatch = await bcrypt.compare(password, validTrainer.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
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

module.exports = { trainerLogin };
