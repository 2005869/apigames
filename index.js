const express = require('express');
const app = express();
const game = require('./database/database');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var DB = {
    games: [
        {
            id: 23,
            name: 'Pitfall',
            year: 1980,
            price: 80
        },
        {
            id: 54,
            name: 'Enduro',
            year: 1982,
            price: 100
        },
        {
            id: 13,
            name: 'PacMan',
            year: 1978,
            price: 90
        },
        {
            id: 83,
            name: 'Tetris',
            year: 1985,
            price: 150
        },
    ]
}

//Rotes

// list all games 
app.get("/games", (req, res) => {
    game.findAll({raw: true, order: [
        ['id', 'DESC'] 
    ]}).then(games => {
        res.json(games)
    });
    
});

// return one game
app.get('/game/:id', (req, res) => {
    if (isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if (game != undefined){
            res.statusCode == 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

// add a game
app.post('/game', (req, res) => {
    var {title, year, price} = req.body;

    game.create({
        title: title,
        year: year,
        price: price
    }).then(() => {
        res.sendStatus(200);
    });
});

// delete game
app.delete('/game/:id', (req, res) => {
    if (isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var index = DB.games.findIndex(g => g.id == id);

        if (index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

// route put
app.put('/game/:id', (req, res) => {
    if (isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);

        if (game != undefined){
            var {title, year, price} = req.body;

            if (title != undefined){
                game.title = title;
            }

            if (year != undefined){
                game.year = year;
            }

            if (price != undefined){
                game.price = price;
            }

            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }
});

app.listen(45678, () => {
    console.log('api run');
});