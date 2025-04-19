const mongoose = require("mongoose");

// Define the schema for Admin
const adminSchema = new mongoose.Schema({
  AdminID: {
    type: String, // AdminID will be a string (Came from SQL when Insertion)
    required: true, // Make sure it is provided when creating an Admin
    unique: true, // Ensure no two admins have the same AdminID
  },
  Image: {
    Type: {
      type: String, // The type of the image (e.g., 'image/jpeg', 'image/png')
      required: true,
    },
    URL: {
      type: String, // The URL for the image
      required: true,
    },
  },
});

// Create the model using the schema
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
