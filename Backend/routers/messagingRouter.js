const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messagesController");
router.get("/conversation/:reciver_id", messageController.getConversation);
router.post("/send", messageController.sendMessage);

module.exports = router;
