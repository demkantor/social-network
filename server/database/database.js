const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://con:secretpass@localhost:5432/social_network',{
    dialect: 'postgres',
    dialectOptions: {
        ssl:{
            require: true
        }
    }
});



module.exports = sequelize;