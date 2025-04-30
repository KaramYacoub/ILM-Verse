const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const guestController = require("../controllers/GuestController");

// check login
router.get("/check", authenticateUser, authController.checkLogin);

// logout
router.post("/logout", authenticateUser, authController.logout);

// get all events
router.get("/events/getEvents", authenticateUser, guestController.getAllEvents);

module.exports = router;
