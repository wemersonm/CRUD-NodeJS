const Sequelize = require('sequelize');

const connection = new Sequelize('users', 'root','',{
    host:'localhost',
    dialect:'mysql'

});


module.exports = connection

