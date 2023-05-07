const express = require('express');
const router = express.Router();
const writeMessageController = require('../../controllers/writeMessageController');

router.put("/", writeMessageController.handleWriteMessage)

module.exports = router;