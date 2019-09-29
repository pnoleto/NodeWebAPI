const controller = require('./../controllers/authenticateController')
const express = require('express');

const router = express.Router();

router.post('/authenticate', controller.post);

module.exports = router;