const express = require("express");
const router = express.Router();
const updateImagesController = require("../../controllers/updateImagesController");

router.put("/", updateImagesController.handleDeleteImages);

module.exports = router;
