const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const {
  createMember,
  getMembers,
  getMemberById,
  searchMember,
} = require("../controllers/memberController");
const upload = require("../middleware/multer.middleware");

router.route("/members").post(upload, createMember).get(protect, getMembers);
router.route("/members/member/:id").get(protect, getMemberById);
router.route("/members/search").get(searchMember);

module.exports = router;
