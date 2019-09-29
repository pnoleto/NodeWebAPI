const jwtMiddleWare = require('./../helpers/jwtMiddleware');
const authRoute = require('./routes/authenticateRoute');
const errorHandler = require('../helpers/errorHandler');
const personRoute = require('./routes/personRoute');
const currentVersion = require("../package.json")
const bodyParser = require('body-parser');
const index = require('./routes/index');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(jwtMiddleWare());
app.use(errorHandler);
app.use(cors());
//const router = express.Router();
//Rotas
app.use(`/${currentVersion.APIVersion}/`, index);
app.use(`/${currentVersion.APIVersion}/persons`, personRoute);
app.use(`/${currentVersion.APIVersion}/user`, authRoute);

module.exports = app;