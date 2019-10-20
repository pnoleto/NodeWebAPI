const repository = require('../../services/repository.service');
const city = require('../models/city.model');
const sequelize = require('sequelize');

const Model = sequelize.Model;

class State extends Model { }
State.init({
    // attributes
    code: {
        type: sequelize.INTEGER,
        allowNull: false,
        comment: 'state identification code'
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        isAlpha: true,
        notEmpty: true,
        max: 100,
        min: 5,
        comment: 'state name'
    }
}, {
    sequelize: repository,
    modelName: 'state'
    // options
});

//State.hasMany(city, { foreignKey: { name: 'idState', allowNull: false } })

module.exports = State;