const express = require('express');
const router = express.Router();
const addressController = require('../../controllers/addressController');

router.put('/', addressController.handleAddress);

module.exports = router;