const mongoose = require("mongoose");

// Define the Submission Schema
const SubmissionSchema = new mongoose.Schema({
  quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz", // Reference to the Quiz model
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
  submissions: [
    {
      question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question", // If you have a separate Question model
        required: true,
      },
      selected_option: {
        type: String, // The text of the selected option
        required: true,
      },
      is_correct: {
        type: Boolean,
        required: true,
      },
      points_awarded: {
        type: Number,
        required: true,
      },
    },
  ],
  submission_time: {
    type: Date,
    default: Date.now,
  },
});

// Create the Submission model
const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;
