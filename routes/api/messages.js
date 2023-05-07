const express = require('express');
const router = express.Router();
const messagesController = require('../../controllers/messagesController');

router.get('/', messagesController.handleMessages);

module.exports = router;