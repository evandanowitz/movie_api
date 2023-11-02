const mongoose = require('mongoose');
const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

// GET a list of ALL movies to the user
app.get('/movies', (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET data about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
    Movies.findOne({ 'Title': req.params.title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET data about a genre by name
app.get('/genres/:name', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.name })
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET data about a director by name
app.get('/directors/:name', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.name })
        .then((movie) => {
            res.status(200).json(movie.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// POST a new user
app.post('/users', async (req, res) => {
    await Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if(user) {
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users
                    .create({
                        ID: req.body.Id, // Integer
                        Username: req.body.Username, // String
                        Password: req.body.Password, // String
                        Email: req.body.Email, // String
                        Birthday: req.body.Birthday // Date
                    })
                    .then((user) => {res.status(201).json(user)})
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// GET all users
app.get('/users', async (req, res) => {
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// GET a user by username
app.get('/users/:Username', async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// PUT users to update their user info (username)
app.put('/users/:Username', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username },
    { $set:
        {
            Username: req.body.Username, // String, required
            Password: req.body.Password, // String, required
            Email: req.body.Email, // String, required
            Birthday: req.body.Birthday // Date
        }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })

});

// POST a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// DELETE a user by username
app.delete('/users/:Username', async (req, res) => {
    await Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if(!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// DELETE allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', async (req, res) => {
    await Users.findOneAndRemove({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
        console.log('Updated User:', updatedUser);
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
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