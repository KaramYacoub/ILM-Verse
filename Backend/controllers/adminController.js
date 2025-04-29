const path = require("path");
const sequelize = require("sequelize");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const bcrypt = require("bcryptjs"); // For hashing
const {
  department,
  student,
  parent,
  section,
  teacher,
  admin,
  course,
  course_student,
  grade,
  event,
} = models; // extract all the needed models

const eventMedia = require("../models/NOSQL/Event");

// Getting Admin data By his Id
exports.getAdmin = async (req, res) => {
  try {
    const admins = await admin.findByPk(req.params.id, {
      attributes: ["gm_id", "first_name", "last_name", "email"],
    });
    res.status(200).json({
      status: "success",
      data: admins,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Addition Functionalites:
exports.addAdmin = async (req, res) => {
  try {
    // Here Will be the SQL insertion for admin
    // Don't Forget the Image into Mongo :)
    // Geting the Password from the Request -->Hash it --> insert it into DB
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 3);
    newAdmin = await admin.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
    });
    // newAdmin  will return the Admin data that inserted in the DB (Containing the Hashed Password)
    // the result musn't have the password value therfore we just send the Attributes from the Array without the Password:
    // The Same for all the functionalites

    res.status(201).json({
      status: "success",
      data: {
        first_name: newAdmin.first_name,
        last_name: newAdmin.last_name,
        email: newAdmin.email,
      },
      message: `${newAdmin.first_name} ${newAdmin.last_name} added`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addTeacher = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 3);

  try {
    const newTeacher = await teacher.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      section_id: req.body.section_id,
      dept_id: req.body.department_id,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      data: {
        first_name: newTeacher.first_name,
        last_name: newTeacher.last_name,
        email: newTeacher.email,
        section_id: newTeacher.section_id,
        dept_id: newTeacher.dept_id,
      },
      message: `${newTeacher.first_name} ${newTeacher.last_name} added`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.addParent = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 3);

  try {
    const newParent = await parent.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      data: {
        first_name: newParent.first_name,
        last_name: newParent.last_name,
        phone: newParent.phone,
      },
      message: `${newParent.first_name} ${newParent.last_name} added`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addStudent = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 3);

  // Here Will be the SQL insertion for student
  try {
    const newStudent = await student.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      parent_id: req.body.parent_id,
      section_id: req.body.section_id,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "success",
      data: {
        first_name: newStudent.first_name,
        last_name: newStudent.last_name,
        parent_id: newStudent.parent_id,
        section_id: newStudent.section_id,
      },
      message: `${newStudent.first_name} ${newStudent.last_name} added`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCourse = async (req, res) => {
  const { subject_name, section_id, teacher_id } = req.body;
  try {
    const newCourse = course.create({
      subject_name: subject_name,
      section_id: section_id,
      teacher_id: teacher_id,
    });

    res.status(201).json({
      status: "success",
      data: {
        subject_name: subject_name,
        section_id: section_id,
        teacher_id: teacher_id,
      },
      message: `${subject_name} added succssesfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGrades = async (req, res) => {
  try {
    allGrades = await grade.findAll();
    res.status(200).json({
      status: "success",
      data: allGrades,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSections = async (req, res) => {
  try {
    const { grade_id } = req.params;
    const Sections = await section.findAll({
      where: {
        grade_id: req.params.grade_id,
      },
    });
    res.status(200).json({
      status: "success",
      data: Sections,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTeachersBySection = async (req, res) => {
  try {
    const { grade_id } = req.params;
    const { dept_id } = await grade.findOne({
      where: {
        grade_id: grade_id,
      },
    });
    const TeachersFromDepartment = await teacher.findAll({
      where: {
        dept_id: dept_id,
      },
    });
    // const Teachers = await teacher.findAll({
    //   where: {
    //     section_id: req.params.section_id,
    //   },
    // });
    res.status(200).json({
      status: "success",
      data: TeachersFromDepartment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
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
/// Testing the Uploading!
exports.addEvent = async (req, res, next) => {
  try {
    //Getting all the Data required for SQL insert(Event)
    const gm_id = req.user.gm_id;
    const { description, title, location } = req.body;
    const current_date = new Date().toISOString().split("T")[0];

    // Map the media into Array named file paths to send it for noSQL
    const fileDetails = req.files.map((file) => {
      const filePath = path.join("./Data/Events", file.filename);
      const fileType = file.mimetype;
      return { path: filePath, type: fileType };
    });

    //SQL Insertion
    const newEvent = await event.create({
      adminid: gm_id,
      date: current_date,

      location: location,
    });
    //Getting event ID to insert it into NOSQL record
    const event_id = newEvent.eventid;

    const noSqlEvent = await new eventMedia({
      event_id: event_id,
      title: title,
      description: description,
      media: fileDetails,
    }).save();
    res.status(201).json({
      status: "success",
      message: "Event with Media Added Succesfully",
      announcment: `${req.body.id}`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
