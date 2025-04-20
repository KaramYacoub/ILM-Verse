const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// login
router.post("/studentLogin", authController.studentLogin);

module.exports = router;
