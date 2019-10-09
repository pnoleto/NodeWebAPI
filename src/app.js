const jwtMiddleWare = require('./../helpers/jwtMiddleware');
const authRoute = require('./routes/authenticateRoute');
const errorHandler = require('../helpers/errorHandler');
const personRoute = require('./routes/personRoute');
const expressWinston = require('express-winston');
const compression = require('compression');
const config = require('./../config.json');
const package = require("../package.json");
const bodyParser = require('body-parser');
const index = require('./routes/index');
const winston = require('winston');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const { APIVersion } = package;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use(jwtMiddleWare());

app.use(cors(config.corsOptions));
//Rotas
app.use(`/${APIVersion}`, index);
app.use(`/${APIVersion}/persons`, personRoute);
app.use(`/${APIVersion}/users`, authRoute);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: `./Logs/log.txt` })
    ],
    format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.timestamp(),
        winston.format.colorize()
    ),
    level: "error"
})
);

app.use(errorHandler);

module.exports = app;