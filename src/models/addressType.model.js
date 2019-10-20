const repository = require('../../services/repository.service');
const sequelize = require('sequelize');

const Model = sequelize.Model;

class AddressType extends Model { }
AddressType.init({
    // attributes
    name: {
        type: sequelize.STRING,
        allowNull: false,
        isAlpha: true,
        notEmpty: true,
        max: 100,
        min: 5,
        comment: 'Adress type name'
    }
}, {
    sequelize: repository,
    modelName: 'addressType'
    // options
});

module.exports = AddressType;