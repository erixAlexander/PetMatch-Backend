const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/registerController");

router.post("/", registerController.handleRegister);
router.post("/native-app", registerController.handleNativeAppRegister);

module.exports = router;
