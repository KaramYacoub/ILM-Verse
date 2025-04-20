const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

// login
router.post("/staffLogin", authController.adminTeacherLogin);
//---------------------------------
// to get the admin data we should send the Admin ID from front-end as param
router.route("/:id").get(adminController.getAdmin);
//---------------------------------
// The 5 Addition Functionality Routes
router.route("/addition/admin").post(adminController.addAdmin);
router.route("/addition/teacher").post(adminController.addTeacher);
router.route("/addition/course");
router.route("/addition/parent");
router.route("/addition/student").post(adminController.addStudent);

module.exports = router;
