const repository = require('../../services/repository.service');
const sequelize = require('sequelize');

const Model = sequelize.Model;

class City extends Model { }
City.init({
    // attributes
    code: {
        type: sequelize.INTEGER,
        allowNull: false,
        comment: 'city identification code'
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        isAlpha: true,
        notEmpty: true,
        max: 100,
        min: 5,
        comment: 'city name'
    },
    idState:{
        type:sequelize.INTEGER,
        allowNull:false,
        references:{
            model:'states',
            id:'id'
        }
    }
}, {
    sequelize: repository,
    modelName: 'city'
    // options
});

module.exports = City;