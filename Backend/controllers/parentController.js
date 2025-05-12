const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../Middlewares/authMiddleware");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const { parent, student, section, grade, department } = models;

exports.getParentStudents = async (req, res) => {
  try {
    const parent_id = req.user.id;
    const students = await student.findAll({
      where: {
        parent_id: parent_id,
      },
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
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });
    if (!students) {
      return res.status(404).json({
        status: "failure",
        data: "Parent doesn't have students",
      });
    }
    res.status(200).json({
      status: "success",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
