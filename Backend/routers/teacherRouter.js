const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// login
router.post("/teacherLogin", authController.TeacherLogin);

module.exports = router;
