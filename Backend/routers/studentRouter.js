const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const uploadSolution = require("../controllers/upload/uploadSolution");
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");

// login
router.post("/studentLogin", authController.studentLogin);

router.post(
  "/course/:course_id/assigments/:assignment_id",
  authenticateUser,
  uploadSolution,
  courseController.submitAssigment
);
module.exports = router;
