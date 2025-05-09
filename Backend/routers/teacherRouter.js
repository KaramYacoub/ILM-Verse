const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const teacherController = require("../controllers/teacherController");
const courseController = require("../controllers/courseController");

const uploadAssigment = require("../controllers/upload/uploadAssigment-Description");
// login
router.post("/teacherLogin", authController.TeacherLogin);

//Marks functionalites

// teacher courses
router.get("/courses", authenticateUser, teacherController.getCourseByID);

// Assigments functionalites
router.post(
  "/course/:course_id/addassigment",
  authenticateUser,
  uploadAssigment,
  courseController.addAssigment
);

module.exports = router;
