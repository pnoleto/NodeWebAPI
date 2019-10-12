const jwtMiddleWare = require('./../helpers/jwtMiddleware');
const authRoute = require('./routes/authenticateRoute');
const errorHandler = require('../helpers/errorHandler');
const personRoute = require('./routes/personRoute');
const { corsOptions } = require('./../config.json');
const expressWinston = require('express-winston');
const compression = require('compression');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const winston = require('winston');
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

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.timestamp(),
        winston.format.colorize(),
    )
}));

app.use(errorHandler);

module.exports = app;