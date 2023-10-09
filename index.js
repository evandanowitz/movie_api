const express = require('express'),
    morgan = require('morgan'),
fs = require('fs'),
path = require('path');
const app = express();

let topMovies = [
    {
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    year: '1994'
    },
    {
    title: 'The Godfather',
    author: 'Francis Ford Coppola',
    year: '1972'
    },
    {
    title: 'The Dark Knight',
    author: 'Christopher Nolan',
    year: '2008'
    },
    {
    title:'The Godfather: Part II',
    author: 'Francis Ford Coppola',
    year: '1974'
    },
    {
    title: '12 Angry Men',
    author: 'Sidney Lumet',
    year: '1957'
    },
    {
    title: 'Schindler\'s List',
    author: 'Steven Spielberg',
    year: '1993'
    },
    {
    title: 'The Lord of the Rings: The Return of the King',
    author: 'Peter Jackson',
    year: '2003'
    },
    {
    title: 'Pulp Fiction',
    author: 'Quentin Tarantino',
    year: '1994'
    },
    {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    author: 'Peter Jackson',
    year: '2001'
    },
    {
    title: 'The Good, the Bad and the Ugly',
    author: 'Sergio Leone',
    year: '1966'
    },
];

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

app.use(express.static('public'));

