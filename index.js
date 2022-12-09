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
app.get('/', () => {
    
});


app.listen(45678, () => {
    console.log('api run');
});