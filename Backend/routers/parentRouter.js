const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const parentController = require("../controllers/parentController");
const courseController = require("../controllers/courseController");
const absenceController = require("../controllers/absenceController");
const studentController = require("../controllers/studentController");
const annoucmentController = require("../controllers/announcmentController");
const downloadController = require("../controllers/download/downloadController");
const reportController = require("../controllers/reportController");

// login
router.post("parentLogin", authController.parentLogin);

// download resources
router.get("/download", downloadController.downloadResource);

// students for parent: //done
router.get("/students", parentController.getParentStudents);

//getCoursesForStudent after choosing the student //done
router.get("/courses/:student_id", studentController.getCoursesForStudent);
//get course by id   //DONE
router.get("/course/:course_id", courseController.getCourseByID);
//getCourseUnits  //DONE
router.get("/course/:course_id/allunits", courseController.getCourseUnits);
//getUnitContent //Done
router.get(
  "/course/:course_id/:unit_id/content",
  courseController.getUnitContent
);
// get student assignment
router.get(
  "/coures/:course_id/assignment/:student_id",
  courseController.getAllAssigmentsForCourseForStudent
);

// get studentMarks(specific one) //done
router.get("/marks/:student_id", studentController.getStudentMarks);
// getStudentAbsences (specific one) //done
router.get(
  "/absence/:student_id/:section_id",
  absenceController.getStudentAbsences
);
router.get("/reports/:student_id", reportController.getStudentReports); //done

// quiz functionalites
//getQuizesForCourse
router.get(
  "/course/:course_id/student/quizes",
  courseController.getQuizesForCourseForStudent
);
//show quiz Mark
router.get(
  "/course/:course_id/quizes/:quiz_id/:student_id/mark",
  courseController.showQuizMark
);
// Annoucments
router.get("/departments", annoucmentController.getParentDepartments);
router.get("/annoucments/:department_id", annoucmentController.getAnnoucments);

module.exports = router;
