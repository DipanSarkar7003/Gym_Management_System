const Payment = require("../models/paymentsModel");
const razorpay = require("razorpay");
const crypto = require("crypto");

// Create a new payment

// const createPayment = async (req, res) => {
//   try {
//     const { senderId, receiverId, amount, method } = req.body;
//     const newPayment = await Payment.create({
//       senderId,
//       receiverId,
//       amount,
//       method,
//     });
//     res.status(200).json({
//       ok: true,
//       message: "Payment created successfully",
//       data: newPayment,
//     });

//     console.log(newPayment);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       message: "Error creating payment",
//       error: error.message,
//     });
//   }
// };

//creatig razorpay Instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// create new payment with razorpay

const createPayment = async (req, res) => {
  const { senderId, amount } = req.body;
  console.log(req.body);

  try {
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: senderId,
      payment_capture: 1,
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          ok: false,
          message: "Error creating payment",
          error: err,
        });
      }

      res.status(200).json({
        ok: true,
        message: "Payment created successfully",
        data: order,
      });
    });
  } catch (error) {
    res.send("payment problem");
  }
};

// Validate razorpay payment

const validatePayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      senderId,
      receiverId,
      amount,
    } = req.body;
    console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature);
    // const generated_signature = hmac_sha256(
    //   order_id + "|" + razorpay_payment_id,
    //   secret
    // );
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    console.log(digest);
    if (digest !== razorpay_signature) {
      console.log("payment signature does not match");
      res.status(400).json({
        ok: false,
        message: "Invalid payment signature",
      });
      return; // exit the function early to avoid unnecessary processing
    }
    console.log("payment done");
    // update payment status on database
    const newpayment = await Payment.create({
      senderId,
      receiverId,
      amount,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      // method: "online",
    });
    res.status(200).json({
      ok: true,
      message: "Payment validated successfully",
      data: {
        newpayment,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error validating payment",
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

module.exports = { createPayment, validatePayment, getPayments };
