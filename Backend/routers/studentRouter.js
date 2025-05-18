const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const studentController = require("../controllers/studentController");
const annoucmentController = require("../controllers/announcmentController");
const uploadSolution = require("../controllers/upload/uploadSolution");
const authController = require("../controllers/authController");
const checkFile = require("../Middlewares/checkFileMiddleware");
const downloadController = require("../controllers/download/downloadController");

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
  "/course/:course_id/assignments/:assignment_id",
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
// download assignments
router.get("/download/submissions", downloadController.downloadAssignments);

// annoucments
router.get("/department", annoucmentController.getStudentDepartment);
router.get("/annoucments/:department_id", annoucmentController.getAnnoucments);

module.exports = router;
