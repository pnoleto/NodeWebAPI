const repository = require('../../services/repository.service');
const sequelize = require('sequelize');

const Model = sequelize.Model;

class Contact extends Model { }
Contact.init({
    // attributes
    name: {
        type: sequelize.STRING,
        allowNull: false,
        isAlpha: true,
        notEmpty: true,
        max: 100,
        min: 5,
        comment: 'conctact alias'
    },
    idContactType: {
        type: sequelize.INTEGER,
        allowNull: false,
        comment: 'conctact type',
        references: {
            model: 'contactTypes',
            key: 'id'
        }
    },
    phoneNumer: {
        type: sequelize.STRING,
        allowNull: false,
        isNumeric: true,
        notEmpty: true,
        max: 20,
        min: 9,
        comment: 'conctact phone number'
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
        notEmpty: true,
        isEmail: true,
        len: [5, 100],
        comment: 'conctact email'
    },
}, {
    sequelize: repository,
    modelName: 'contact'
    // options
});

module.exports = Contact;