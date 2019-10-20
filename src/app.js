const jwtMiddleWare = require('../helpers/jwtMiddleware');
const authRoute = require('./routes/authenticateRoute');
const errorHandler = require('../helpers/errorHandler');
const logger = require('../services/logger.service');
const personRoute = require('./routes/personRoute');
const { corsOptions } = require('../config.json');
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
//O middlewere de log deve estar entre as rotas e o manipulador de erros.
app.use(logger);
//O middlewere de manipulação de erros deve ser sempre o ultimo.
app.use(errorHandler);

const addressType = require('./models/addressType.model');
const persons = require('./models/person.model');
const address = require('./models/address.model');
const state = require('./models/state.model');
const city = require('./models/city.model');

//persons.sync().then(() => console.log('tabela pessoa criada com sucesso')).catch((err) => console.log('erro ao criar tabela pessoa', err.message));
//addressType.sync().then(() => console.log('tabela tipos de endereco criada com sucesso')).catch((err) => console.log('erro ao criar tabela tipo de endereco', err.message));
//state.sync().then(() => console.log('tabela stado criada com sucesso')).catch((err) => console.log('erro ao criar tabela estado', err.message));
//city.sync().then(() => console.log('tabela cidade criada com sucesso')).catch((err) => console.log('erro ao criar tabela cidade', err.message));
//address.sync().then(() => console.log('tabela endereco criada com sucesso')).catch((err) => console.log('erro ao endereco tabela endereco', err.message));


module.exports = app;