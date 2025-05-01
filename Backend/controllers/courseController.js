const path = require("path");
const sequelize = require("sequelize");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const { course } = models;
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await course.findAll();
    res.status(200).json({
      status: "success",
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Involve students in a course
exports.involveStudents = async (req, res) => {
  try {
    const { course_id } = req.body;

    // Step 1: Get section_id of the course
    const courseData = await course.findOne({
      where: {
        course_id: course_id,
      },
    });

    if (!courseData) {
      return res.status(404).json({ error: "Course not found" });
    }

    const section_id = courseData.section_id;

    // Step 2: Get all students in the section
    const students = await student.findAll({
      where: {
        section_id: section_id,
      },
    });

    // Step 3: Filter out students already involved in the course
    const involvedStudents = [];

    for (const student of students) {
      const isStudentInvolved = await course_student.findOne({
        where: {
          course_id: course_id,
          student_id: student.student_id,
        },
      });

      if (!isStudentInvolved) {
        involvedStudents.push({
          course_id: course_id,
          student_id: student.student_id,
        });
      }
    }

    // Step 4: Bulk create involvement for students not already involved
    if (involvedStudents.length > 0) {
      const addedStudents = await course_student.bulkCreate(involvedStudents);
      res.status(201).json({
        status: "success",
        message: `${addedStudents.length} Student(s) Added Successfully`,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "All students are already involved in this course.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
