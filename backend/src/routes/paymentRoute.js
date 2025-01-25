const express = require ("express");
const { createPayment } = require("../controllers/paymentController");

const router = express.Router();

 router.route("/payments").post(createPayment).get(getPayments);


module.exports = router