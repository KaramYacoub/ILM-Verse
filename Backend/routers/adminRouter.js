const express = require("express");
const router = express.Router();
const Controller = require("../controllers/adminController");

// to get the admin data we should send the Admin ID from front-end as param
router.route("/:id").get(Controller.getAdmin);
//---------------------------------
// The 5 Addition Functionality Routes
router.route("/addition/admin").post(Controller.addAdmin);
router.route("/addition/teacher").post(Controller.addTeacher);
router.route("/addition/course");
router.route("/addition/parent");
router.route("/addition/student").post(Controller.addStudent);

module.exports = router;
