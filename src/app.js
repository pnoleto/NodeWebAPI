const jwtMiddleWare = require('./../helpers/jwtMiddleware');
const authRoute = require('./routes/authenticateRoute');
const errorHandler = require('../helpers/errorHandler');
const personRoute = require('./routes/personRoute');
const package = require("../package.json")
const bodyParser = require('body-parser');
const index = require('./routes/index');
const express = require('express');
const cors = require('cors');

const app = express();
const { APIVersion } = package;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(jwtMiddleWare());
app.use(cors());
//Rotas
app.use(`/${ APIVersion }`, index);
app.use(`/${ APIVersion }/persons`, personRoute);
app.use(`/${ APIVersion }/users`, authRoute);

app.use(errorHandler);

module.exports = app;