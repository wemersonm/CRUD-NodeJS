const Sequelize = require('sequelize') ;
const connection = require('./database');


const person = connection.define('people',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    rg:{
        type:Sequelize.STRING,
        allowNull:false
    },
    address:{
        type:Sequelize.STRING,
        allowNull:false
    },
    city:{
        type:Sequelize.STRING,
        allowNull:false
    }
    
});

person.sync({force:false}).then(()=>{});

module.exports = person;