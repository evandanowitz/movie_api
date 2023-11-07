const mongoose = require('mongoose'); // Imports Mongoose library, allowing you to interact with MongoDB using JS
const Models = require('./models.js'); // Imports 'models.js' file containing Mongoose models for the app

const Movies = Models.Movie; // References Mongoose 'movies' model. Represents 'movies' collection in MongoDB db
const Users = Models.User; // References Mongoose 'users' model. Represents 'users' collection in MongoDB db

mongoose.connect('mongodb://localhost:27017/cfDB', // Establishes a connection to a MongoDB db running locally
{useNewUrlParser: true, useUnifiedTopology: true}); // Ensures Mongoose uses latest connection logic

const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let auth = require('./auth')(app); // Imports 'auth.js' file into project

const passport = require('passport'); // Requires Passport module
require('./passport'); // Imports 'passport.js' file

app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

app.use(express.static('public'));

app.get('/documentation.html', (req, res) => { // GET documentation.html page
    res.sendFile('public/documentation.html', {root: __dirname});
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}));

// GET a list of ALL movies to the user
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => { // GET data about a single movie by title to the user
    Movies.findOne({ 'Title': req.params.title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.get('/genres/:name', passport.authenticate('jwt', { session: false }), async (req, res) => { // GET data about a genre by name
    Movies.findOne({ 'Genre.Name': req.params.name })
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.get('/directors/:name', passport.authenticate('jwt', { session: false }), async (req, res) => { // GET data about a director by name
    Movies.findOne({ 'Director.Name': req.params.name })
        .then((movie) => {
            res.status(200).json(movie.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.post('/users', async (req, res) => { // POST a new user
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

app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => { // GET all users
    await Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => { // GET a user by username
    await Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => { // PUT users to update their user info (username)
    // Condition to check added here
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    // Condition ends
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

app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => { // POST a movie to a user's list of favorites
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

app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => { // DELETE a user by username
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

app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => { // DELETE allow users to remove a movie from their list of favorites
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