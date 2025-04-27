const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const downloadController = require("../controllers/download/downloadController");

// login
router.post("/studentLogin", authController.parentLogin);

// download resources
router.get("/download", downloadController.downloadResource);

module.exports = router;
