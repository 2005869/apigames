const express = require('express');
const app = express();
const game = require('./database/database');
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


//Rotes

// list all games 
app.get("/games", (req, res) => {
    game.findAll({raw: true, order: [
        ['id', 'DESC'] 
    ]}).then(games => {
        res.json(games)
    }).catch(() => {
        res.sendStatus(400);
    });
    
});

// return one game
app.get('/game/:id', (req, res) => {
    if (isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        game.findOne({
            where: {id: id}
        }).then(game => {
            if (game != undefined){
                res.json(game);
                res.status(200)
            }else{
                res.sendStatus(400);
            }
        });
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

        game.findOne({where: {id: id}}).then(gameid => {
            if (gameid != undefined){
                gameid.destroy();
                res.sendStatus(200);
            }
            else{
                res.sendStatus(400);
            }
        });
    }
});

// route put
app.put('/game/:id', (req, res) => {
    if (isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        game.findOne({where: {id: id}}).then(gameid => {
            if (gameid != undefined){

                var {title, year, price} = req.body;

                if (title != undefined){
                    gameid.update({title: title});
                }
    
                if (year != undefined){
                    gameid.update({year: year});
                }
    
                if (price != undefined){
                    gameid.update({price: price});
                }
                res.sendStatus(200);
            }else{
                res.sendStatus(400);
            }
        });
    }
});

app.listen(45678, () => {
    console.log('api run');
});