const express = require("express");
const {
  createPayment,
  getPayments,
  validatePayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.route("/payments").get(getPayments);
router.route("/order").post(createPayment);
router.route("/order/validate").post(validatePayment);

module.exports = router;
