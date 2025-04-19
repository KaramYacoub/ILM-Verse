const express = require("express");
const sequelize = require("sequelize");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const { admin } = models; // extract the admin model

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
  console.log(req.body);
  try {
    // Here Will be the SQL insertion for admin
    // Don't Forget the Image into Mongo :)

    res.status(201).json({
      status: "success",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.addTeacher = async (req, res) => {
  const { teacher } = models;
  console.log(req.body);
  // Here Will be the SQL insertion for Teacher
  try {
    res.status(201).json({
      status: "success",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
