const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender_id: {
      type: String,
      required: true,
    },
    sender_type: {
      type: String,
      required: true,
    },
    reciver_id: {
      type: String,
      required: true,
    },
    reciver_type: {
      type: String,
      required: true,
    },

    message_text: {
      type: String,
      required: true,
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
