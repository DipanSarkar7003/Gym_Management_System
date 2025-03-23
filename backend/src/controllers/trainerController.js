const Trainer = require("../models/trainerModel");
const bcrypt = require("bcrypt");
const uploadToCloudinary = require("../utils/cloudinary");
const fs = require("fs");
// Create a new trainer

const createTrainer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      joinDate,
      monthlySalary,
      role,
      status,
    } = req.body;

    const filePath = req.file.path;

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !joinDate ||
      !monthlySalary ||
      !filePath
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

    // upload photo to cloudinary

    const { secure_url } = await uploadToCloudinary(filePath, "trainers");

    fs.unlinkSync(filePath); // Delete the local file after upload to cloudinary
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const newTrainer = new Trainer({
      fullName,
      email,
      phone,
      password: hashPassword,
      joinDate,
      monthlySalary,
      role,
      photo: secure_url,
      status,
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

// get single trainer

const getSingleTrainer = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(403).json({
        ok: false,
        message: "Please provide trainer id",
      });

    const trainer = await Trainer.findById(id);

    if (!trainer)
      return res.status(404).json({
        ok: false,
        message: "Trainer not found",
      });

    res.status(200).json({
      ok: true,
      message: "Trainer fetched successfully",
      data: trainer,
    });
  } catch (err) {
    res.status(404).json({
      ok: false,
      message: "Trainer not found",
      error: err.message,
    });
  }
};

module.exports = { createTrainer, getTrainers, getSingleTrainer };
