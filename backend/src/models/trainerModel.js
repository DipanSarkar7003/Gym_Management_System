const mongoose = require("mongoose");

// creating a trainer schema

const trainerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  monthlySalary: {
    type: Number,
    required: true,
  },

  role: {
    type: String,
    required: true,
    enum: ["Trainer", "Admin"],
  },
});
