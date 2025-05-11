const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const studentController = require("../controllers/studentController");

const uploadSolution = require("../controllers/upload/uploadSolution");
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");

// login
router.post("/studentLogin", authController.studentLogin);

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
  "/course/:course_id/:unit_id",
  authenticateUser,
  courseController.getUnitContent
);
// assignment functionalites

// show assignments for speicific course
router.get(
  "/course/:course_id/assignments/getassignments",
  authenticateUser,
  courseController.getAllAssigmentsForCourse
);
//submit assignment based on assignment_id
router.post(
  "/course/:course_id/assigments/:assignment_id",
  authenticateUser,
  uploadSolution,
  courseController.submitAssigment
);
//show student Grades
router.get("/grades", authenticateUser, studentController.getStudentGrades);
module.exports = router;
