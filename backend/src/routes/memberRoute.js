const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const { createMember, getMembers } = require("../controllers/memberController");
const upload = require("../middleware/multer.middleware");

router.route("/members").post(upload, createMember).get(protect, getMembers);

module.exports = router;
