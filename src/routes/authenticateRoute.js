const controller = require('./../controllers/authenticateController')
const express = require('express');

const router = express.Router();

router.post('/token', controller.authenticate);
router.post('/refreshToken', controller.authenticate);

module.exports = router;