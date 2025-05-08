const path = require("path");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const { course, teacher, section, grade, department, course_student, student } =
  models;

exports.getCourseByID = async (req, res) => {
  try {
    const teacher_id = req.user.id;
    const courses = await course.findAll({
      where: {
        teacher_id,
      },
    });

    res.status(201).json({
      status: "success",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
