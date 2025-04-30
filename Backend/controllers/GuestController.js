const sequelize = require("sequelize");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const eventMedia = require("../models/NOSQL/Event"); // your NoSQL event model
const { event } = models;
exports.getAllEvents = async (req, res) => {
  try {
    const sqlEvents = await event.findAll();
    mergedEvents = [];

    for (const oneEvent of sqlEvents) {
      const noSqlEvent = await eventMedia.findOne({
        event_id: oneEvent.eventid,
      });

      const { title, description, media, event_id } = noSqlEvent;
      const { location, eventdate } = oneEvent;
      const mergedEvent = {
        event_id,
        title,
        description,
        location,
        eventdate,
        media,
      };
      mergedEvents.push(mergedEvent);
    }
    res.status(200).json({
      status: "success",
      data: mergedEvents,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
