const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const studentController = require("../controllers/studentController");
const uploadSolution = require("../controllers/upload/uploadSolution");
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const checkFile = require("../Middlewares/checkFileMiddleware");

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
//get unit content //done
router.get(
  "/course/:course_id/:unit_id/content",
  authenticateUser,
  courseController.getUnitContent
);
// assignment functionalites

// show assignments for speicific course   //done
//please don't change the url :)
router.get(
  "/course/:course_id/assignments/getassignments",
  authenticateUser,
  courseController.getAllAssigmentsForCourseForStudent
);
//submit assignment based on assignment_id
router.post(
  "/course/:course_id/assigments/:assignment_id",
  authenticateUser,
  uploadSolution,
  checkFile,
  courseController.submitAssigment
);
//show student Grades  //done
router.get("/grades", authenticateUser, studentController.getStudentMarks);

// quiz functionalites
//getQuizesForCourse
router.get(
  "/course/:course_id/quizes",
  authenticateUser,
  courseController.getQuizesForCourse
);
module.exports = router;
