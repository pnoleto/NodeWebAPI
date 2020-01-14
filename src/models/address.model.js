const repository = require('../../services/repository.service');
const addressType = require('../models/addressType.model');
const person = require('../models/person.model');
const city = require('../models/city.model');
const sequelize = require('sequelize');

const Model = sequelize.Model;

class Adress extends Model { }
Adress.init({
    // attributes
    idAddressType: {
        type: sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        references: {
            model: 'addressTypes',
            key: 'id'
        },
        comment: 'addresses type foreign key'
    },
    idPerson: {
        type: sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        references: {
            model: 'people',
            key: 'id'
        },
        comment: 'addresses person foreign key'
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        isAlpha: true,
        notEmpty: true,
        len: [5, 15],
        comment: 'addresses alias'
    },
    location: {
        type: sequelize.STRING,
        allowNull: false,
        isAlpha: true,
        notEmpty: true,
        len: [5, 100],
        comment: 'addresses road, avenue, square and etc'
    },
    locationNumber: {
        type: sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        comment: 'addresses number'
    },
    neighborhood: {
        type: sequelize.STRING,
        allowNull: false,
        isNumeric: true,
        notEmpty: true,
        len: [5, 100],
        comment: 'addresses neighborhood'
    },
    postalCode: {
        type: sequelize.STRING,
        allowNull: false,
        isNumeric: true,
        comment: 'addresses postal code',
        len: [5, 15],
    },
    idCity: {
        type: sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        references: {
            model: 'cities',
            key: 'id'
        },
        comment: 'addresses city'
    }
}, {
    sequelize: repository,
    modelName: 'address'
    // options
});

module.exports = Adress;