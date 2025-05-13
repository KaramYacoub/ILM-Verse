const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const parentController = require("../controllers/parentController");
const courseController = require("../controllers/courseController");
const absenceController = require("../controllers/absenceController");
const studentController = require("../controllers/studentController");
const downloadController = require("../controllers/download/downloadController");
const reportController = require("../controllers/reportController");
const authenticateUser = require("../Middlewares/authMiddleware");

// login
router.post("/studentLogin", authController.parentLogin);

// download resources
router.get("/download", downloadController.downloadResource);

// students for parent:
router.get("/students", authenticateUser, parentController.getParentStudents);

//getCoursesForStudent after choosing the student
router.get(
  "/courses/:student_id",
  authenticateUser,
  studentController.getCoursesForStudent
);
//getCourseUnits
router.get(
  "/course/:course_id",
  authenticateUser,
  courseController.getCourseUnits
);
//getUnitContent
router.get(
  "/course/:course_id/:unit_id",
  authenticateUser,
  courseController.getUnitContent
);

// get studentMarks(specific one)
router.get(
  "/marks/:student_id",
  authenticateUser,
  studentController.getStudentMarks
);
// getStudentAbsences (specific one)
router.get(
  "/absence/:student_id/:section_id",
  authenticateUser,
  absenceController.getStudentAbsences
);
router.get(
  "/reports/:student_id",
  authenticateUser,
  reportController.getStudentReports
);

module.exports = router;
