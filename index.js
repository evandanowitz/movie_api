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

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

app.use(express.static('public'));

app.get('/documentation.html', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}));

// Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
    res.send('GET request for all movies');
});

// Return data about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
    res.send(`GET request for movie titled: ${req.params.title}`);
});

// Return data about a genre by name
app.get('/genres/:name', (req, res) => {
    res.send(`GET request for data about a genre (description) named: ${req.params.name}`);
});

// Return data about a director by name
app.get('/directors/:name', (req, res) => {
    res.send(`GET request for data about a director (bio, birth year, death year) named: ${req.params.name}`);
});

// Allow new users to register
app.post('/users/register', (req, res) => {
    res.send(`POST request to allow new users to register with a ${req.params.username} and ${req.params.password}`);
});

// Allow users to update their user info (username)
app.put('/users/update/:username', (req, res) => {
    res.send(`PUT request to allow users to update their user info using their ${req.params.username}`);
});

// Allow users to add a movie to their list of favorites
app.post('/users/favorites/add/:title', (req, res) => {
    res.send(`POST request to allow users to add the movie titled: ${req.params.title} to their list of favorites`);
});

// Allow existing users to deregister
app.delete('/users/deregister/:username', (req, res) => {
    res.send(`DELETE request to allow new users to deregister with a ${req.params.username} and ${req.params.password}`);
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/favorites/remove/:title', (req, res) => {
    res.send(`DELETE request to allow users to remove the movie titled: ${req.params.title} from their list of favorites`);
});

app.use((req, res) => {
    res.status(404).send('Page Not Found!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('My server is running on port 8080.');
});