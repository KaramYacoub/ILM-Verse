const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const parentController = require("../controllers/parentController");
const courseController = require("../controllers/courseController");
const absenceController = require("../controllers/absenceController");
const studentController = require("../controllers/studentController");
const downloadController = require("../controllers/download/downloadController");
const reportController = require("../controllers/reportController");

// login
router.post("/studentLogin", authController.parentLogin);

// download resources
router.get("/download", downloadController.downloadResource);

// students for parent: //done
router.get("/students", parentController.getParentStudents);

//getCoursesForStudent after choosing the student //done
router.get("/courses/:student_id", studentController.getCoursesForStudent);
//getCourseUnits
router.get("/course/:course_id", courseController.getCourseUnits);
//getUnitContent
router.get("/course/:course_id/:unit_id", courseController.getUnitContent);

// get studentMarks(specific one) //done
router.get("/marks/:student_id", studentController.getStudentMarks);
// getStudentAbsences (specific one) //done
router.get(
  "/absence/:student_id/:section_id",
  absenceController.getStudentAbsences
);
router.get("/reports/:student_id", reportController.getStudentReports);

module.exports = router;
