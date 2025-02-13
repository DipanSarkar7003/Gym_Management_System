const express = require("express");
const router = express.Router();
const {
  createTrainer,
  getTrainers,
  getSingleTrainer,
} = require("../controllers/trainerController");
const { trainerLogin } = require("../controllers/authController");

const { protect } = require("../controllers/authController");

router.route("/trainers").post(createTrainer).get(getTrainers);
router.route("/trainers/:id").get(protect, getSingleTrainer);

router.route("/trainers/login").post(trainerLogin);

module.exports = router;
