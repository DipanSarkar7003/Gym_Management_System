const Member = require("../models/memberModel");
const uploadToCloudinary = require("../utils/cloudinary");
// Creating member

const createMember = async function (req, res) {
  // console.log(req.body);
  // console.log(req.file);

  try {
    const {
      fullName,
      email,
      phone,
      address,
      joinDate,
      status,
      monthlyBill,
      assignedby,
      role,
    } = req.body;

    const filePath = req.file.path;

    console.log(filePath);

    // Check if member with same name already exists
    const existingMember = await Member.findOne({ phone });

    if (existingMember) {
      return res.status(400).json({ message: "Member already exists" });
    }

    // if member doesen't exist then upload the photo to cloudinary

    const { secure_url } = await uploadToCloudinary(filePath);

    // console.log(secure_url);

    // Create new member
    const newMember = new Member({
      fullName,
      photo: secure_url,
      email,
      phone,
      address,
      joinDate,
      status,
      monthlyBill,
      assignedby,
      role,
    });

    await newMember.save();

    res.status(201).json({
      ok: true,
      data: newMember,
      message: "Member created successfully",
    });
  } catch (err) {
    console.log("Error in creating member", err);
    res.status(500).json({
      ok: false,
      message: "Error in creating member",
      error: err.message,
    });
  }
};

// Read member Details
const getMembers = async function (req, res) {
  console.log("Member Details");
try{
  const members = await Member.find()
  res.status(200).json({
    ok: true,
    data: members,
    message: "Members fetched successfully",
  })
}catch{
  console.log("Error in fetching members", err);
  res.status(500).json({
    ok: false,
    message: "Error in fetching members",
    error: err.message,
  })
}
};

// Updating member details

// Deleting Member

// Ban member

module.exports = { createMember, getMembers };
