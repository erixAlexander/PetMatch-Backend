const express = require("express");
const router = express.Router();
const messagesController = require("../../controllers/messagesController");

router.get("/", messagesController.handleMessages);
router.get("/native", messagesController.handleGetLastMessage);

module.exports = router;
