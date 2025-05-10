const mongoose = require("mongoose");

// Define the Quiz Schema
const QuizSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  total_points: {
    type: Number,
    required: true,
  },
  questions: [
    {
      question_text: {
        type: String,
        required: true,
      },
      options: [
        {
          option_text: {
            type: String,
            required: true,
          },
          isCorrectAnswer: {
            type: Boolean,
            required: true,
          },
        },
      ],
      points: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Create the Quiz model
const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
