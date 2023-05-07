const express = require('express');
const router = express.Router();
const addMatchController = require('../../controllers/addMatchController');

router.put('/', addMatchController.handleAddMatch);

module.exports = router;