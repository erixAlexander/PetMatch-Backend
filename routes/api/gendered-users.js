const express = require('express');
const router = express.Router();
const genderedUsersController = require('../../controllers/genderedUsersController');

router.get('/', genderedUsersController.handleGenderedUsers);

module.exports = router;