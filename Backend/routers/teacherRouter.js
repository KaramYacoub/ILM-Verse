const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const teacherController = require("../controllers/teacherController");
const courseController = require("../controllers/courseController");

const uploadAssigment = require("../controllers/upload/uploadAssigment-Description");
// login
router.post("/teacherLogin", authController.TeacherLogin);

//Marks functionalites

// course Functionalites
router.get("/courses", authenticateUser, teacherController.getCourseByID);
router.get(
  "/course/:course_id",
  authenticateUser,
  courseController.getStudentsInCourse
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

module.exports = router;
