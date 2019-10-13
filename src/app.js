const jwtMiddleWare = require('./../helpers/jwtMiddleware');
const authRoute = require('./routes/authenticateRoute');
const errorHandler = require('../helpers/errorHandler');
const logger = require('../services/logger.service'); 
const personRoute = require('./routes/personRoute');
const { corsOptions } = require('./../config.json');
const compression = require('compression');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(jwtMiddleWare());
app.use(compression());
app.use(helmet());
//Rotas
app.use(`/v1`, index);
app.use(`/v1/persons`, personRoute);
app.use(`/v1/users`, authRoute);

app.use(logger);

app.use(errorHandler);

module.exports = app;