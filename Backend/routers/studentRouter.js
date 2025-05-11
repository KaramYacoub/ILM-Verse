const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const studentController = require("../controllers/studentController");

const uploadSolution = require("../controllers/upload/uploadSolution");
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");

// login
router.post("/studentLogin", authController.studentLogin);

router.post(
  "/course/:course_id/assigments/:assignment_id",
  authenticateUser,
  uploadSolution,
  courseController.submitAssigment
);
//course functionalites
router.get(
  "/courses",
  authenticateUser,
  studentController.getCoursesForStudent
);
//get units
router.get(
  "/course/:course_id",
  authenticateUser,
  courseController.getCourseUnits
);
//get unit content
router.get(
  "course/:course_id/:unit_id",
  authenticateUser,
  courseController.getUnitContent
);
router.get("/course/hi", authenticateUser, courseController.getUnitContent);
module.exports = router;
