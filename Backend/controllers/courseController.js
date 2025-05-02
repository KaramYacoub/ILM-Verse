const path = require("path");
const sequelize = require("sequelize");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const { course, teacher, section, grade, department, course_student, student } =
  models;
const Report = require("../models/NOSQL/Report");
//get all courses(data is filtered)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await course.findAll({
      include: [
        {
          model: section,
          as: "section",
          attributes: ["section_name"],
          include: [
            {
              model: grade,
              as: "grade",
              attributes: ["grade_name"],
              include: [
                {
                  model: department,
                  as: "dept",
                  attributes: ["name"], // Retrieve department's name via grade
                },
              ],
            },
          ],
        },
        {
          model: teacher,
          as: "teacher",
          attributes: ["first_name", "last_name"], // Teacher info
        },
      ],
    });
    //Filter the Response
    const filteredCourses = courses.map((course) => {
      return {
        course_id: course.course_id,
        course_name: course.course_name,
        teacher_name: `${course.teacher?.first_name || "No teacher assigned"} ${
          course.teacher?.last_name || ""
        }`.trim(), // teacher name can be null
        department: course.section.grade.dept.name,
        grade_name: course.section.grade.grade_name,
        section_name: course.section.section_name,
      };
    });
    res.status(200).json({
      status: "success",
      data: {
        filteredCourses,
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
// change teacher for specific course (don't forget to use getTeachersBySection from admin controller)
exports.updateTeacher = async (req, res) => {
  try {
    const { course_id, newtTeacher_id } = req.body;
    const courseData = await course.findOne({
      where: {
        course_id: course_id,
      },
    });
    if (!courseData) {
      return res.status(404).json({ error: "Course not found" });
    }
    const updatedCourse = await course.update(
      {
        teacher_id: newtTeacher_id,
      },
      {
        where: {
          course_id: course_id,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Teacher Changed Successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// get students in course
exports.getStudentsInCourse = async (req, res) => {
  try {
    const { course_id } = req.body;

    // Query the course_student table to fetch students enrolled in the specified course
    const courseStudents = await course_student.findAll({
      where: {
        course_id: course_id,
      },
      include: [
        {
          model: student,
          as: "student", // Make sure this matches the association alias
          attributes: ["first_name", "last_name", "student_id"], // Select required student fields
        },
      ],
    });

    // Check if any students are found
    if (!courseStudents || courseStudents.length === 0) {
      return res
        .status(404)
        .json({ error: "No students found for this course" });
    }

    // Extract student details from the results
    const students = courseStudents.map(
      (courseStudent) => courseStudent.student
    );

    // Return the list of students
    res.status(200).json({
      status: "success",
      data: students,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//
exports.addReport = async (req, res) => {
  const { first_name, last_name, course_id, student_id, date, description } =
    req.body;
  const role = req.role;

  console.log(course_id, student_id, date, description);
  res.status(201).json({
    status: "success",
    message: "Report Added Successfully",
  });
};
