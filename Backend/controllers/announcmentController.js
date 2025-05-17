const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const {
  admin,
  student,
  section,
  grade,
  department,
  teacher,
  parent,
  announcment,
} = models;
const { Sequelize } = require("sequelize");

exports.sendAnnouncment = async (req, res) => {
  try {
    const { department_id, content } = req.body;
    const admin_id = req.user.id;
    let newAnnouncment;
    if (department_id === "general") {
      newAnnouncment = await announcment.create({
        content: content,
        adminid: admin_id,
      });
    } else {
      newAnnouncment = await announcment.create({
        content: content,
        adminid: admin_id,
        department_id: department_id,
      });
    }

    res.status(201).json({
      status: "success",
      message: "annoucment added successfully",
      newAnnouncment,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAnnoucments = async (req, res) => {
  try {
    const { department_id } = req.params;
    let annoucments;
    if (department_id === "general") {
      annoucments = await announcment.findAll({
        where: {
          department_id: null,
        },
        include: {
          model: admin,
          as: "admin",
          attributes: [
            [
              Sequelize.fn(
                "concat",
                Sequelize.col("admin.first_name"),
                " ",
                Sequelize.col("admin.last_name")
              ),
              "full_name",
            ],
          ],
        },
      });
    } else {
      annoucments = await announcment.findAll({
        where: {
          department_id: department_id,
        },
        include: {
          model: admin,
          as: "admin",
          attributes: [
            [
              Sequelize.fn(
                "concat",
                Sequelize.col("admin.first_name"),
                " ",
                Sequelize.col("admin.last_name")
              ),
              "full_name",
            ],
          ],
        },
      });
    }
    res.status(200).json({
      status: "success",
      data: annoucments,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
