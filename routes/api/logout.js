const express = require("express");
const router = express.Router();
const logoutController = require("../../controllers/logoutController");

router.get("/", logoutController.handleLogout);
router.get("/native-app", logoutController.handleNativeAppLogout);

module.exports = router;
