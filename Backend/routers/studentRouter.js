const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const studentController = require("../controllers/studentController");
const uploadSolution = require("../controllers/upload/uploadSolution");
const authController = require("../controllers/authController");
const checkFile = require("../Middlewares/checkFileMiddleware");

// login  //done
router.post("/studentLogin", authController.studentLogin);

//course functionalites  //done
router.get(
  "/courses",

  studentController.getCoursesForStudent
);
//get course by id //done
router.get(
  "/course/:course_id",

  courseController.getCourseByID
);

//get units //done
router.get(
  "/course/:course_id/units",

  courseController.getCourseUnits
);
//get unit content //done
router.get(
  "/course/:course_id/:unit_id/content",

  courseController.getUnitContent
);
// assignment functionalites

// show assignments for speicific course   //done
//please don't change the url :)
router.get(
  "/course/:course_id/assignments/getassignments",

  courseController.getAllAssigmentsForCourseForStudent
);
//submit assignment based on assignment_id
router.post(
  "/course/:course_id/assigments/:assignment_id",

  uploadSolution,
  checkFile,
  courseController.submitAssigment
);
//show student Grades  //done
router.get("/grades", studentController.getStudentMarks);

// quiz functionalites
//getQuizesForCourse
router.get(
  "/course/:course_id/quizes",
  courseController.getQuizesForCourseForStudent
);
// getQuizToStart
router.get(
  "/course/:course_id/quizes/:quiz_id",
  courseController.getQuizToStart
);
// submitAnswer
router.post("/course/:course_id/quizes/:quiz_id", courseController.submitQuiz);
//show quiz Mark
router.get(
  "/course/:course_id/quizes/:quiz_id/mark",
  courseController.showQuizMark
);
module.exports = router;
