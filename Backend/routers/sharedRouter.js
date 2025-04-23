const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");

// check login
router.get("/check", authenticateUser, authController.checkLogin);

// logout
router.post("/logout", authenticateUser, authController.logout);

module.exports = router;
