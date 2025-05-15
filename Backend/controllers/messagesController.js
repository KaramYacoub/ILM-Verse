const sequelize = require("sequelize");
const SQL = require("../models/Connections/SQL-Driver"); // your Sequelize instance
const initModels = require("../models/index"); // path to index.js
const models = initModels(SQL); // initialize models
const { student, teacher, parent, admin } = models;
const Message = require("../models/NOSQL/Message");
// functions to get the users for the messages then search on them
// getAllStudents , getAllParents ,getAllTeachers ,getAllDepartments built in adminController just het them.

function determineUserType(id) {
  if (id.startsWith("ADM")) {
    return "admin";
  } else if (id.startsWith("TCH")) {
    return "teacher";
  } else if (id.startsWith("STD")) {
    return "student";
  } else if (id.startsWith("Parent")) {
    return "parent";
  }
}

exports.sendMessage = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const sender_type = determineUserType(sender_id);
    const { reciver_id, message_text } = req.body;
    const reciver_type = determineUserType(reciver_id);
    // console.log(sender_id, sender_type);
    // console.log(reciver_id, reciver_type);
    // console.log(message_text);
    console.log("before");
    const newMessage = new Message({
      sender_id: sender_id,
      sender_type: sender_type,
      reciver_id: reciver_id,
      reciver_type: reciver_type,
      message_text: message_text,
    });
    await newMessage.save();

    // real time functionality => socket.io
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
exports.getConversation = async (req, res) => {
  try {
    const sender_id = req.user.id;
    const { reciver_id } = req.params;
    console.log(sender_id, reciver_id);
    const messages = await Message.find({
      $or: [
        { sender_id: sender_id, reciver_id: reciver_id }, // to get the sent messages
        { sender_id: reciver_id, reciver_id: sender_id }, // to get the recived messages
      ],
    });
    console.log(messages);

    res.status(200).json({
      messages,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
