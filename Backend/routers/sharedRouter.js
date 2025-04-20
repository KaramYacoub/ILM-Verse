const express = require("express");
const router = express.Router();
const { checkLogin, logout } = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");

// check login
router.get("/check", authenticateUser, checkLogin);

// logout
router.post("/logout", authenticateUser, logout);

module.exports = router;
