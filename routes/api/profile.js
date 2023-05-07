const express = require('express');
const router = express.Router();
const profileUpdateController = require('../../controllers/profileUpdateController');
const cloudinaryImages = require('../../middleware/cloudinaryImages');

router.put('/', cloudinaryImages, profileUpdateController.profileUpdate);

module.exports = router;