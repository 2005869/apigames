const express = require('express');
const app = express();

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
app.get('/games', (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
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
    var {id, title, year, price} = req.body;

    DB.games.push({
        id: id,
        title,
        price,
        year
    });

    res.sendStatus(200);
});


app.listen(45678, () => {
    console.log('api run');
});