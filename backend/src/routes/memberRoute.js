const express = require("express");
const router = express.Router();
const { createMember, getMembers } = require("../controllers/memberController");
const upload = require("../middleware/multer.middleware");

router.route("/members").post(upload, createMember).get(getMembers);

module.exports = router;
