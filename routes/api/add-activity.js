const express = require("express");
const router = express.Router();
const addActivityController = require("../../controllers/addActivityController");

router.put("/", addActivityController.handleAddActivity);
router.get("/", addActivityController.handleGetActivityUsers);

module.exports = router;
