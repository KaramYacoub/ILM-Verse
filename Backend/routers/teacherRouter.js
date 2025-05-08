const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const teacherController = require("../controllers/teacherController");

// login
router.post("/teacherLogin", authController.TeacherLogin);

// teacher courses
router.get(
  "/courses",
  authenticateUser,
  teacherController.getCourseByID
);

module.exports = router;
