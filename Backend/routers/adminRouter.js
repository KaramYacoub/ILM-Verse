const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const uploadFiles = require("../controllers/upload/uploadEvent"); // Import the upload middleware
const guestController = require("../controllers/GuestController");
// login
router.post("/staffLogin", authController.adminTeacherLogin);
//---------------------------------
// to get the admin data we should send the Admin ID from front-end as param
router.get("/:id", authenticateUser, adminController.getAdmin);
//---------------------------------
// The 5 Addition Functionality Routes
router.post("/addition/admin", authenticateUser, adminController.addAdmin);
router.post("/addition/teacher", authenticateUser, adminController.addTeacher);
router.post("/addition/parent", authenticateUser, adminController.addParent);
router.post("/addition/student", authenticateUser, adminController.addStudent);
router.post("/addition/course", authenticateUser, adminController.addCourse);

// get all students, teachers, parents , admins and courses
router.get(
  "/addition/course/grades",
  authenticateUser,
  adminController.getGrades
);
router.get(
  "/addition/course/grades/:grade_id",
  authenticateUser,
  adminController.getSections
);
router.get(
  "/addition/course/grades/:grade_id/:section_id",
  authenticateUser,
  adminController.getTeachersBySection
);

//Involve all students in specific section inside A course by course Id
router.post(
  "/course/involve",
  authenticateUser,
  adminController.involveStudents
);

// // The 5 Delete Functionality Routes
// router.post("/delete/admin", authenticateUser, adminController.deleteAdmin);
// router.post("/delete/teacher", authenticateUser, adminController.deleteTeacher);
// router.post("/delete/parent", authenticateUser, adminController.deleteParent);
// router.post("/delete/student", authenticateUser, adminController.deleteStudent);
// router.post("/delete/course", authenticateUser, adminController.deleteCourse);

//Event 2 Post Conditions , first one for

router.post("/events", authenticateUser, uploadFiles, adminController.addEvent);
router.get("/events", authenticateUser, guestController.getAllEvents);

module.exports = router;
