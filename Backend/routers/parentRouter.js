const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const parentController = require("../controllers/parentController");
const courseController = require("../controllers/courseController");
const studentController = require("../controllers/studentController");
const downloadController = require("../controllers/download/downloadController");
const authenticateUser = require("../Middlewares/authMiddleware");

// login
router.post("/studentLogin", authController.parentLogin);

// download resources
router.get("/download", downloadController.downloadResource);

// students for parent:
router.get("/students", authenticateUser, parentController.getParentStudents);
// get studentMarks(specific one)
router.get(
  "/grades/:student_id",
  authenticateUser,
  studentController.getStudentMarks
);
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
module.exports = router;
