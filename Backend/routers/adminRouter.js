const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const courseController = require("../controllers/courseController");
const absenceController = require("../controllers/absenceController");
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const uploadFiles = require("../controllers/upload/uploadEvent"); // Import the upload middleware for events
const uploadContent = require("../controllers/upload/uploadContentMiddleWare"); //Import the upload middleware for courses

// login
router.post("/adminLogin", authController.adminLogin);
//---------------------------------
// to get the admin data we should send the Admin ID from front-end as param
// router.get("/:id", authenticateUser, adminController.getAdmin);
//---------------------------------
// The 5 Addition Functionality Routes
router.post("/addition/admin", authenticateUser, adminController.addAdmin);
router.post("/addition/teacher", authenticateUser, adminController.addTeacher);
router.post("/addition/parent", authenticateUser, adminController.addParent);
router.post("/addition/student", authenticateUser, adminController.addStudent);

// get grades then sections then teachers in the department of the section , then add course
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
router.post("/addition/course", authenticateUser, adminController.addCourse);

//Event 2 Post Conditions , first one for
router.post("/events", authenticateUser, uploadFiles, adminController.addEvent);
router.delete(
  "/events/:event_id",
  authenticateUser,
  adminController.deleteEvent
);

// Get all students,parents,teachers,admins

router.get("/getStudents", authenticateUser, adminController.getAllStudents);
router.get("/getParents", authenticateUser, adminController.getAllParents);
router.get("/getTeachers", authenticateUser, adminController.getAllTeachers);
router.get("/getAdmins", authenticateUser, adminController.getAllAdmins);
// The 4 Delete Functionalities Routes
router.delete(
  "/delete/student/:id",
  authenticateUser,
  adminController.deleteStudent
);
router.delete(
  "/delete/parent/:id",
  authenticateUser,
  adminController.deleteParent
);
router.delete(
  "/delete/teacher/:id",
  authenticateUser,
  adminController.deleteTeacher
);
router.delete(
  "/delete/admin/:id",
  authenticateUser,
  adminController.deleteAdmin
);
// update password functionality , (remember to check the body from postman)
router.patch(
  "/update/password",
  authenticateUser,
  adminController.changePassword
);

//course functionalites: getAllCourses ,involve , changeteacher then details
//Involve all students in specific section inside A course by course Id
router.get("/course", authenticateUser, courseController.getAllCourses);
router.post(
  "/course/involve",
  authenticateUser,
  courseController.involveStudents
);
router.get(
  "/course/getteachersbycourse/:course_id",
  authenticateUser,
  courseController.getTeachersByCourse
);
router.patch(
  "/course/changeteacher",
  authenticateUser,
  courseController.updateTeacher
);
router.get(
  "/course/getstudents/:course_id",
  authenticateUser,
  courseController.getStudentsInCourse
);
router.post("/course/addreport", authenticateUser, courseController.addReport);
router.post("/course/addunit", authenticateUser, courseController.addUnit);
router.get(
  "/course/:course_id",
  authenticateUser,
  courseController.getCourseUnits
);
router.get(
  "/course/media/:unit_id",
  authenticateUser,
  courseController.getUnitContent
);
router.post(
  "/course/:unit_id",
  authenticateUser,
  uploadContent,
  courseController.addUnitContent
);
router.get(
  "/course/:course_id/:unit_id/:media_id",
  authenticateUser,
  courseController.getLecture
);
router.delete(
  "/course/:course_id/:unit_id",
  authenticateUser,
  courseController.deleteUnit
);
router.delete(
  "/course/media/:unit_id/:media_id",
  authenticateUser,
  courseController.deleteMedia
);
//Marks functionalites
router.post(
  "/course/:course_id/mark",
  authenticateUser,
  courseController.addMark
);
router.patch(
  "/course/:course_id/mark",
  authenticateUser,
  courseController.editMark
);
router.get(
  "/course/:course_id/mark",
  authenticateUser,
  courseController.getMark
);
// Absence functionalites
router.post("/absence", authenticateUser, absenceController.updateAbsence);
router.get("/absence", authenticateUser, absenceController.getAbsence);
module.exports = router;
