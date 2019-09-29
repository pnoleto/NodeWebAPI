const jwtMiddleWare = require('./../helpers/jwtMiddleware');
const authRoute = require('./routes/authenticateRoute');
const personRoute = require('./routes/personRoute');
const errorHandler = require('../helpers/errorHandler');
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
app.use('/v1/', index);
app.use('/v1/persons', personRoute);
app.use('/v1/user', authRoute);

module.exports = app;