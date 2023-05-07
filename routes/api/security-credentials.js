const express = require('express');
const router = express.Router();
const changeCredentialsController = require('../../controllers/changeCredentialsController');

router.put('/', changeCredentialsController.handleSecurityCredentials);

module.exports = router;