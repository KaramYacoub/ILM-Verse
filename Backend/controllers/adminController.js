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
