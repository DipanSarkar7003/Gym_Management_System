const Member = require("../models/memberModel");
const uploadToCloudinary = require("../utils/cloudinary");
const fs = require("fs");
const Payment = require("../models/paymentsModel");

// Creating member

const createMember = async function (req, res) {
  console.log(req.body);
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
    } = req.body;

    // console.log(req.body);
    // console.log(req)

    const filePath = req.file.path;
    // console.log(filePath);

    // // Check if member with same name already exists
    const existingMember = await Member.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingMember) {
      return res.status(400).json({
        ok: false,
        message: "Member already exists with this email or phone number",
      });
    }

    // // // if member doesen't exist then upload the photo to cloudinary

    const { secure_url } = await uploadToCloudinary(filePath);
    console.log(filePath);
    fs.unlinkSync(filePath); // Delete the local file after upload to cloudinary
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
  try {
    const members = await Member.find();
    res.status(200).json({
      ok: true,
      data: members,
      message: "Members fetched successfully",
    });
  } catch {
    console.log("Error in fetching members", err);
    res.status(500).json({
      ok: false,
      message: "Error in fetching members",
      error: err.message,
    });
  }
};

//get single member details

const getMemberById = async function (req, res) {
  try {
    const member = await Member.findById(req.params.id).populate(
      "assignedby",
      "fullName"
    );

    if (!member) {
      return res.status(404).json({
        ok: false,
        message: "Member not found",
      });
    }

    //fetch all payments where sender id matches the member id

    const payments = await Payment.find({ senderId: member._id });

    let nextBillDate = new Date(member.joinDate); // Start from the join date

    // Increase nextBillDate for each successful payment
    payments.forEach(() => {
      nextBillDate.setMonth(nextBillDate.getMonth() + 1);
    });

    res.status(200).json({
      ok: true,
      data: { ...member.toObject(), payments, nextBillDate },
      message: "Member fetched successfully",
    });
  } catch (err) {
    console.log("Error in fetching member", err);
    res.status(500).json({
      ok: false,
      message: "Error in fetching member",
      error: err.message,
    });
  }
};

// search member by name , number or email

const searchMember = async function (req, res) {
  const { q } = req.query;

//   let query = {
//     $or: [
//       { fullName: { $regex: q, $options: "i" } }, // Case-insensitive name search
//       { email: { $regex: q, $options: "i" } }, // Case-insensitive email search
//     ],
//   };

//   // If the search term is a number, also search in the phone number field
//   if (!isNaN(q)) {
//     query.$or.push({ number: q });
//   }
// console.log(query)
  const members = await Member.find({fullName: q});
  console.log(members);
  res.json(members);
};

// Updating member details

// Deleting Member

// Ban member

module.exports = { createMember, getMembers, getMemberById, searchMember };
