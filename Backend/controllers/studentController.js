const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const courseController = require("../controllers/courseController");
const authenticateUser = require("../Middlewares/authMiddleware");

const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const { course_student, student, course, grade, department } = models;

exports.getCoursesForStudent = async (req, res) => {
  try {
    const student_id = req.user.id;

    const coursesForStudent = await course_student.findAll({
      where: {
        student_id: student_id,
      },
      attributes: ["course_id"],
      include: [
        {
          model: course,
          as: "course",
          attributes: ["subject_name"],
        },
      ],
    });
    if (!coursesForStudent) {
      return res.stats(404).json({
        status: "failure",
        message: "No courses found for this student",
      });
    }
    res.status(200).json({
      status: "success",
      data: coursesForStudent,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
