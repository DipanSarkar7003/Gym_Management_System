const express = require("express");
const router = express.Router();
const {
  createTrainer,
  getTrainers,
} = require("../controllers/trainerController");

router.route("/trainers").post(createTrainer).get(getTrainers);

module.exports = router;
