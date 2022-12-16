const Sequelize = require('sequelize');

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './database/games.sqlite'
});

const Game = connection.define('Game', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: Sequelize.FLOAT,
    allowNull: false
});


Game.sync({force: false}).then(() => {
    console.log('create table');
});

module.exports = {Game, connection};