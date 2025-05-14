const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const teacherController = require("../controllers/teacherController");
const courseController = require("../controllers/courseController");
const absenceController = require("../controllers/absenceController");
const reportController = require("../controllers/reportController");
const uploadContent = require("../controllers/upload/uploadContentMiddleWare");
const uploadAssigment = require("../controllers/upload/uploadAssigment-Description");
const checkFile = require("../Middlewares/checkFileMiddleware");
const downloadController = require("../controllers/download/downloadController");

// login
router.post("/teacherLogin", authController.TeacherLogin);

//Marks functionalites

// course Functionalites
router.get("/courses", teacherController.getCourseByTeacherID);
router.get("/course/:course_id", teacherController.getCourseByCourseID);
// get all students in course
router.get("/course/:course_id/students", courseController.getStudentsInCourse);
//get course units
router.get("/course/:course_id/units", courseController.getCourseUnits);
// add new unit
router.post("/course/:course_id/addunit", courseController.addUnit);
//get unit content
router.get("/course/media/:unit_id", courseController.getUnitContent);
// add unit content
router.post(
  "/course/:unit_id",
  uploadContent,
  checkFile,
  courseController.addUnitContent
);
// delete content
router.delete("/course/media/:unit_id/:media_id", courseController.deleteMedia);

// Assigments functionalites
//Done
router.post(
  "/course/:course_id/addassigment",
  uploadAssigment,
  checkFile,
  courseController.addAssigment
);
//Done
router.get(
  "/course/:course_id/assigments",
  courseController.getAllAssigmentsForCourse
);
// delete assignment
router.delete(
  "/course/:course_id/assigments/delete-assignment/:assignment_id",
  courseController.deleteAssigment
);
//done except ( real student )
router.get(
  "/course/:course_id/assigments/:assignment_id",
  courseController.showAssigmentSubmission
);
router.patch(
  "/course/:course_id/assigments/update/:assignment_id",
  courseController.updateSubmissionStatus
);

// quizes
router.get("/course/:course_id/allQuizes", courseController.getAllQuizes);
router.get("/course/quiz/:quiz_id", courseController.getQuiz);
router.post("/course/:course_id/quiz", courseController.addQuiz);
router.delete("/course/deletequiz/:quiz_id", courseController.deleteQuiz);
router.patch("/course/quiz/:quiz_id", courseController.editQuiz);

// Absence functionality
router.get("/students/:section_id", courseController.getStudentInSection);
router.get("/absence/:date", absenceController.getAbsence);
router.post("/absence", absenceController.updateAbsence);

// report functionality
router.post(
  "/course/:course_id/addnewreport",

  reportController.addReport
);

// download assignments
router.get("/download/submissions", downloadController.downloadAssignments);

// download submissions
router.get("/download/submissions", downloadController.downloadSubmissions);

module.exports = router;
