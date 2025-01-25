const express = require("express");
const router = express.Router();
const {
  createTrainer,
  getTrainers,
} = require("../controllers/trainerController");
const { trainerLogin } = require("../controllers/authController");

router.route("/trainers").post(createTrainer).get(getTrainers);

router.route("/trainers/login").post(trainerLogin);

module.exports = router;
