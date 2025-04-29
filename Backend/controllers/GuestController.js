const sequelize = require("sequelize");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const eventMedia = require("../models/NOSQL/Event"); // your NoSQL event model
const { event } = models;

exports.getAllEvents = async (req, res) => {
  try {
    // 1. Fetch all events from SQL database and save in sqlEvents variable
    const sqlEvents = await event.findAll();
    console.log("SQL Events:", sqlEvents); // Debug: Log SQL events

    // 2. Fetch all event media from NoSQL database and save in mediaData variable
    const mediaData = await eventMedia.find();
    console.log("NoSQL Media Data:", mediaData); // Debug: Log NoSQL media data

    // 3. Send response with success message
    res.status(200).json({
      status: "hi",
    });
  } catch (error) {
    console.log("Error occurred:", error); // Log any errors
    res.status(500).json({ error: error.message });
  }
};
