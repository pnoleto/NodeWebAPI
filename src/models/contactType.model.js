const repository = require('../../services/repository.service');
const sequelize = require('sequelize');

const Model = sequelize.Model;

class ContactType extends Model { }
ContactType.init({
    // attributes
    name: {
        type: sequelize.STRING,
        allowNull: false,
        isAlpha: true,
        notEmpty: true,
        len: [5, 100],
        comment: 'conctact type name'
    }
}, {
    sequelize: repository,
    modelName: 'contactType'
    // options
});

module.exports = ContactType;