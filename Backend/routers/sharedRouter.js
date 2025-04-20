const express = require("express");
const router = express.Router();
const { checkLogin } = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");

// check login
router.get("/check", authenticateUser, checkLogin);

module.exports = router;
