const { postgresOptions } = require('../config.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(postgresOptions);

    /*sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.message);
    });*/

module.exports = sequelize;