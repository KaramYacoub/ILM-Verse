const mongoose = require("mongoose");

// Define the Assigment Schema
const AssigmentSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  studentsSubmission: [
    {
      student_id: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      isSubmitted: {
        type: Boolean,
        default: false,
      },
      mark: {
        type: Number,
        required: false,
      },
    },
  ],
});

// Create the AbsenceReport model
const Assigment = mongoose.model("Assigment", AssigmentSchema);

module.exports = Assigment;
