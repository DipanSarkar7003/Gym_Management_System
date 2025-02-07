const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");

const memberSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    // unique: true,
    // match: /^\S+@\S+\.\S+$/,
  },
  phone: {
    type: String,
    required: true,
    // unique: true,
  },
  address: {
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
    default: "Active",
  },
  monthlyBill: {
    type: Number,
    required: true,
  },
  assignedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
