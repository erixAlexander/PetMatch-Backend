const express = require('express');
const router = express.Router();
const readMessageController = require('../../controllers/readMessageController');

router.put("/", readMessageController.handleReadMessage)



module.exports = router;