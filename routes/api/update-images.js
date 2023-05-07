const express = require("express");
const router = express.Router();
const updateImagesController = require("../../controllers/updateImagesController");
const cloudinaryImage = require("../../middleware/cloudinaryImage");

router.put("/", cloudinaryImage, updateImagesController.handleUpdateImages);

module.exports = router;
