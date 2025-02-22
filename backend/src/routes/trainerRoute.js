const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.middleware");
const {
  createTrainer,
  getTrainers,
  getSingleTrainer,
} = require("../controllers/trainerController");
const { trainerLogin } = require("../controllers/authController");

const { protect } = require("../controllers/authController");

router.route("/trainers").post(upload, createTrainer).get(getTrainers);
router.route("/trainers/:id").get(protect, getSingleTrainer);

router.route("/trainers/login").post(trainerLogin);

module.exports = router;
