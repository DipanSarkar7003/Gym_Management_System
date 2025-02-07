const Payment = require("../models/paymentsModel");

// Create a new payment

const createPayment = async (req, res) => {
  try {
    const { senderId, receiverId, amount, method } = req.body;
    const newPayment = await Payment.create({
      senderId,
      receiverId,
      amount,
      method,
    });
    res.status(200).json({
      ok: true,
      message: "Payment created successfully",
      data: newPayment,
    });

    console.log(newPayment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error creating payment",
      error: error.message,
    });
  }
};

// get all payments

getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("senderId", "fullName email photo")
      .populate("receiverId", "fullName email ");

    res.status(200).json({
      ok: true,
      message: "Payments fetched successfully",
      data: payments,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error getting payments",
      error: err.message,
    });
  }
};

//update payment status
//delete payment

module.exports = { createPayment };
