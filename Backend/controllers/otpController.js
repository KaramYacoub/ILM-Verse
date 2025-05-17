const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const { admin, teacher } = models;
const { Sequelize } = require("sequelize");

function generateOTP() {
  const length = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }
  return otp;
}

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    res.status(201).json({
      status: "success",
      data: generateOTP(),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
