const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const studentController = require("../controllers/studentController");

const uploadSolution = require("../controllers/upload/uploadSolution");
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");

// login  //done
router.post("/studentLogin", authController.studentLogin);

//course functionalites  //done
router.get(
  "/courses",
  authenticateUser,
  studentController.getCoursesForStudent
);
//get course by id //done
router.get(
  "/course/:course_id",
  authenticateUser,
  courseController.getCourseByID
);

//get units //done
router.get(
  "/course/:course_id/units",
  authenticateUser,
  courseController.getCourseUnits
);
//get unit content
router.get(
  "/course/:course_id/:unit_id/content",
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
//show student Grades  //done
router.get("/grades", authenticateUser, studentController.getStudentMarks);
module.exports = router;
