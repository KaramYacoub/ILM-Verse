const mongoose = require("mongoose");

// Define the Event Schema
const reportSchema = new mongoose.Schema({
  instructor_name: {
    type: String,
    required: true,
  },
  instructor_type: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
