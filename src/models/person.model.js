const repository = require('../../services/repository.service');
const Sequelize = require('sequelize');

const Model = Sequelize.Model;

class Person extends Model { }
Person.init({
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true,
        notEmpty: true,
        max: 150,
        min: 5,
    },
    lastName: {
        type: Sequelize.STRING,
        isAlpha: true,
        notEmpty: true,
        max: 150,
        min: 5,
    },
    documentType: {
        type: Sequelize.STRING,
        isAlpha: true,
        notEmpty: true,
        isIn: ['CPF', 'RG', 'CNH'],
        max: 3,
        min: 3,
    },
    document: {
        type: Sequelize.STRING,
        isAlpha: true,
        notEmpty: true,
        max: 15,
        min: 8,
    }
}, {
    sequelize: repository,
    modelName: 'person'
    // options
});

module.exports = Person;