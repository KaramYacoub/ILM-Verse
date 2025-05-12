const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const {
  course_student,
  student,
  course,
  grade,
  department,
  student_marks,
  mark_type,
} = models;

exports.getCoursesForStudent = async (req, res) => {
  try {
    let student_id;
    if (req.role === "parent") {
      student_id = req.params.student_id;
    } else {
      student_id = req.user.id;
    }

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
exports.getStudentMarks = async (req, res) => {
  try {
    let student_id;
    if (req.role === "parent") {
      student_id = req.params.student_id;
    } else {
      student_id = req.user.id;
    }
    const studentCourses = await course_student.findAll({
      where: {
        student_id: student_id,
      },
    });

    let coursesGrades = [];

    // Iterate through each course the student is enrolled in
    for (let oneCourse of studentCourses) {
      let courseMarks = {
        course_id: oneCourse.course_id,
        subject_name: "", // To hold the subject_name of the course
        marks: [],
      };

      // For each course, check for the marks in the four types: First, Second, Third, Final
      const markTypes = ["First", "Second", "Third", "Final"];

      // For each type, check if the student has a mark for that type in the current course
      for (let type of markTypes) {
        const oneMark = await student_marks.findOne({
          where: {
            student_id: student_id,
            course_id: oneCourse.course_id,
            type_id: getMarkTypeId(type), // Function to map type to type_id
          },
          include: [
            {
              model: course_student,
              as: "course_student",
              include: [
                {
                  model: course,
                  as: "course",
                  attributes: ["subject_name"], // Get the subject name for the course
                },
              ],
            },
            {
              model: mark_type,
              as: "type",
              attributes: ["type_name"], // Include the type name
            },
          ],
        });

        // If the mark exists, add the actual mark_value
        if (oneMark) {
          courseMarks.subject_name = oneMark.course_student.course.subject_name;
          courseMarks.marks.push({
            type: type,
            mark_value: oneMark.mark_value,
          });
        } else {
          // If no mark exists for the type, push "Not Marked"
          courseMarks.subject_name = courseMarks.subject_name || "Unknown";
          courseMarks.marks.push({
            type: type,
            mark_value: "Not Marked",
          });
        }
      }

      // Push the course marks to the result array
      coursesGrades.push(courseMarks);
    }

    res.status(200).json({
      status: "success",
      data: coursesGrades, // Send the grades data back as a response
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Helper function to get the mark type ID based on the type name
const getMarkTypeId = (typeName) => {
  switch (typeName) {
    case "First":
      return "MT-001"; // Assuming 'MT-001' is the ID for 'First'
    case "Second":
      return "MT-002"; // Assuming 'MT-002' is the ID for 'Second'
    case "Third":
      return "MT-003"; // Assuming 'MT-003' is the ID for 'Third'
    case "Final":
      return "MT-004"; // Assuming 'MT-004' is the ID for 'Final'
    default:
      return null;
  }
};
