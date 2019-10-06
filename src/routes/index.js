const package = require("../../package.json")
const express = require('express');

const { APIVersion } = package;
const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "Node Express API",
        version: `${ APIVersion }`
    });
});

module.exports = router;