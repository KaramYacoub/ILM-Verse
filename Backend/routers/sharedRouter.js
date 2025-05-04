const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const guestController = require("../controllers/GuestController");
const downloadController = require("../controllers/download/downloadController");

// check login
router.get("/check", authenticateUser, authController.checkLogin);

// logout
router.post("/logout", authenticateUser, authController.logout);

// get all events
router.get("/events/getEvents", guestController.getAllEvents);

// download resources
router.get("/download", downloadController.downloadResource);

module.exports = router;
