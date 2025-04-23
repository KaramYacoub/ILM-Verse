const express = require("express");
const sequelize = require("sequelize");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const bcrypt = require("bcryptjs"); // For hashing
const { department, section, teacher, admin, course } = models; // extract all the needed models

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
      message: `${newAdmin.first_name} ${newAdmin.last_name}`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.addTeacher = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 3);

  // Here Will be the SQL insertion for Teacher
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
      message: `${newTeacher.first_name} ${newTeacher.last_name}`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.addParent = async (req, res) => {
  const { parent } = models;
  console.log(req.body);
  // Here Will be the SQL insertion for Parent
  try {
    res.status(201).json({
      status: "success",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.addStudent = async (req, res) => {
  const { student } = models;
  console.log(req.body);
  // Here Will be the SQL insertion for student
  try {
    res.status(201).json({
      status: "success",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
