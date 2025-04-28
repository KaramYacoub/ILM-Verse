const express = require("express");
const sequelize = require("sequelize");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const bcrypt = require("bcryptjs"); // For hashing
const announcment = require("../models/SQL/announcment");
const { department, student, parent, section, teacher, admin, course } = models; // extract all the needed models

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
    const { password, first_name, last_name, email } = req.body;

    // Validation
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        status: "failed",
        error: "All fields are required",
      });
    }

    // Check if admin already exists
    const existingAdmin = await admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({
        status: "failed",
        error: "Admin with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 3);

    const newAdmin = await admin.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      data: {
        first_name: newAdmin.first_name,
        last_name: newAdmin.last_name,
        email: newAdmin.email,
      },
      message: `${newAdmin.first_name} ${newAdmin.last_name} added successfully`,
    });
  } catch (error) {
    console.error("Admin creation error:", error);
    res.status(500).json({
      status: "failed",
      error: "Internal server error",
    });
  }
};

exports.addTeacher = async (req, res) => {
  const { password, first_name, last_name, email, section_id, dept_id } =
    req.body;

  // Validation
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !section_id ||
    !dept_id
  ) {
    return res.status(400).json({
      status: "failed",
      error: "All fields are required",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 3);

  // Check if admin already exists
  const existingTeacher = await admin.findOne({ where: { email } });
  if (existingTeacher) {
    return res.status(400).json({
      status: "failed",
      error: "Teacher with this email already exists",
    });
  }

  try {
    const newTeacher = await teacher.create({
      first_name,
      last_name,
      email,
      section_id,
      dept_id,
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
  const { password, first_name, last_name, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 3);

  try {
    const newParent = await parent.create({
      first_name,
      last_name,
      phone,
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
    res.status(500).json({ error: error.message });
  }
};

exports.addStudent = async (req, res) => {
  const { password, first_name, last_name, parent_id, section_id } = req.body;
  const hashedPassword = await bcrypt.hash(password, 3);

  // Here Will be the SQL insertion for student
  try {
    const newStudent = await student.create({
      first_name,
      last_name,
      parent_id,
      section_id,
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
  //console.log(req.body);

  try {
    // const newCourse = course.create({
    //   subject_name: req.body.subject_name,
    //   section_id: req.body.section_id,
    //   teacher_id: req.body.teacher_id,
    // });
    course_studentsData = await student.findAll({
      attributes: ["student_id"],
      where: {
        section_id: req.body.section_id,
      },
    });
    console.log(course_studentsData);
    res.status(201).json({
      status: "success",
      data: {
        subject_name: req.body.subject_name,
        section_id: req.body.section_id,
        teacher_id: req.body.teacher_id,
      },
      message: `${req.body.subject_name} added succssesfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/// Testing the Uploading!
exports.uploadFile = (req, res, next) => {
  console.log(req.file);
  console.log(req.body.id);
  res.status(201).json({
    status: "success",
    message: "Logged in successfully",
    announcment: `${req.body.id}`,
  });
  next();
};
