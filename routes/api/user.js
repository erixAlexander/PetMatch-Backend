const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const cloudinaryImages = require("../../middleware/cloudinaryImages");

router
  .route("/")
  .put(cloudinaryImages, userController.updateUserInfo)
  .get(userController.getUserInfo);

router.route("/matches").get(userController.getUserMatches);

module.exports = router;
