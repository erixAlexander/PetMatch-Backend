const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const cloudinaryImages = require('../../middleware/cloudinaryImages');

router
  .route("/")
  .put(cloudinaryImages, userController.updateUserInfo)
  .get(userController.getUserInfo);

module.exports = router;
