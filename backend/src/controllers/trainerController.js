const Trainer = require("../models/trainerModel");

// Create a new trainer

const createTrainer = async (req, res) => {
  try {
    const { fullName, email, phone, password, joinDate, monthlySalary, role } =
      req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !joinDate ||
      !monthlySalary
    )
      return res.status(403).json({
        ok: false,
        message: "Please provide all required fields",
      });

    const trainerExist = await Trainer.findOne({ $or: [{ email }, { phone }] });

    if (trainerExist)
      return res.status(403).json({
        ok: false,
        message: "Trainer already exists",
      });

    const newTrainer = new Trainer({
      fullName,
      email,
      phone,
      password,
      joinDate,
      monthlySalary,
      role,
    });

    await newTrainer.save();

    res.status(200).json({
      ok: true,
      message: "Trainer created successfully",
      data: newTrainer,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error creating trainer",
      error: err.message,
    });
  }
};

// READ TRAINERS

const getTrainers = async (erq, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json({
      ok: true,
      message: "Trainers fetched successfully",
      data: trainers,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error getting trainers",
      error: err.message,
    });
  }
};

module.exports = { createTrainer, getTrainers };
