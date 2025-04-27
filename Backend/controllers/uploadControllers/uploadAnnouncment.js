// fileController.js
const multer = require("multer");
const path = require("path");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for the uploaded file
    cb(null, "./Data"); // 'Data' is the folder where the file will be saved
  },
  filename: function (req, file, cb) {
    // Generate a unique name using a timestamp + file extension
    const fileExtension = path.extname(file.originalname); // Extracts the file extension
    const uniqueName = Date.now() + fileExtension; // Create a unique file name with the extension

    cb(null, uniqueName); // Save the file with the generated name
  },
});

// Initialize multer with the correct storage configuration
const upload = multer({ storage: storage });

// Middleware for handling file upload
const uploadFileMiddleware = upload.single("data");

module.exports = uploadFileMiddleware;
