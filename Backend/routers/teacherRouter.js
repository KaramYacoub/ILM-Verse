const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const teacherController = require("../controllers/teacherController");
const courseController = require("../controllers/courseController");
const absenceController = require("../controllers/absenceController");
const uploadContent = require("../controllers/upload/uploadContentMiddleWare");
const uploadAssigment = require("../controllers/upload/uploadAssigment-Description");

// login
router.post("/teacherLogin", authController.TeacherLogin);

//Marks functionalites

// course Functionalites
router.get(
  "/courses",
  authenticateUser,
  teacherController.getCourseByTeacherID
);
router.get(
  "/course/:course_id",
  authenticateUser,
  teacherController.getCourseByCourseID
);
// get all students in course
router.get(
  "/course/:course_id/students",
  authenticateUser,
  courseController.getStudentsInCourse
);
//get course units
router.get(
  "/course/:course_id/units",
  authenticateUser,
  courseController.getCourseUnits
);
//get unit content
router.get(
  "/course/media/:unit_id",
  authenticateUser,
  courseController.getUnitContent
);
// add unit content
router.post(
  "/course/:unit_id",
  authenticateUser,
  uploadContent,
  courseController.addUnitContent
);
// delete content
router.delete(
  "/course/media/:unit_id/:media_id",
  authenticateUser,
  courseController.deleteMedia
);

// Assigments functionalites
//Done
router.post(
  "/course/:course_id/addassigment",
  authenticateUser,
  uploadAssigment,
  courseController.addAssigment
);
//Done
router.get(
  "/course/:course_id/assigments",
  authenticateUser,
  courseController.getAllAssigmentsForCourse
);
//done except ( real student )
router.get(
  "/course/:course_id/assigments/:assignment_id",
  authenticateUser,
  courseController.showAssigmentSubmission
);
router.patch(
  "/course/:course_id/assigments/:assignment_id",
  authenticateUser,
  courseController.updateSubmissionStatus
);

// quizes
router.post(
  "/course/:course_id/quiz",
  authenticateUser,
  courseController.addQuiz
);
router.delete(
  "/course/deletequiz/:quiz_id",
  authenticateUser,
  courseController.deleteQuiz
);
router.get("/course/quiz/:quiz_id", authenticateUser, courseController.getQuiz);
router.patch(
  "/course/quiz/:quiz_id",
  authenticateUser,
  courseController.editQuiz
);

// Absence functionality
router.get("/absence/:date", authenticateUser, absenceController.getAbsence);

module.exports = router;
