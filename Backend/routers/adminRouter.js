const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");

// login
router.post("/staffLogin", authController.adminTeacherLogin);
//---------------------------------
// to get the admin data we should send the Admin ID from front-end as param
router.route("/:id").get(adminController.getAdmin);
//---------------------------------
// The 5 Addition Functionality Routes
router.post("/addition/admin", authenticateUser, adminController.addAdmin);
router.post("/addition/teacher", authenticateUser, adminController.addTeacher);
router.post("/addition/parent", authenticateUser, adminController.addParent);
router.post("/addition/student", authenticateUser, adminController.addStudent);
// router.post("/addition/course", adminController.addCourse);

// get all students, teachers, parents , admins and courses

// // The 5 Delete Functionality Routes
// router.post("/delete/admin", authenticateUser, adminController.deleteAdmin);
// router.post("/delete/teacher", authenticateUser, adminController.deleteTeacher);
// router.post("/delete/parent", authenticateUser, adminController.deleteParent);
// router.post("/delete/student", authenticateUser, adminController.deleteStudent);
// router.post("/delete/course", authenticateUser, adminController.deleteCourse);

module.exports = router;
