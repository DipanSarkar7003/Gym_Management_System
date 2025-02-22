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
  password: {
    type: String,
    required: true,
    minlength: 6,
    // select: false,
    // this will not be returned in the query result by default.
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
  status: {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "active",
  },
  monthlySalary: {
    type: Number,
    required: true,
  },

  role: {
    type: String,
    required: true,
    enum: ["admin", "trainer"],
    default: "trainer",
  },
});

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
