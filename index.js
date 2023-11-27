const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path');
  mongoose = require('mongoose'); // Imports Mongoose library, allowing you to interact with MongoDB using JS
  Models = require('./models.js'); // Imports 'models.js' file containing Mongoose models for the app
  cors = require('cors');
  const { check, validationResult } = require('express-validator');

const Movies = Models.Movie; // References Mongoose 'movies' model. Represents 'movies' collection in MongoDB db
const Users = Models.User; // References Mongoose 'users' model. Represents 'users' collection in MongoDB db

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn't found on the list of allowed origins
      let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

let auth = require('./auth')(app); // Imports 'auth.js' file into project
const passport = require('passport'); // Requires Passport module
require('./passport'); // Imports 'passport.js' file

mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// GET documentation.html page
app.get('/documentation.html', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname});
});

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

// GET data about a single movie by title to the user
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ 'Title': req.params.title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET data about a genre by name
app.get('/genres/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ 'Genre.Name': req.params.name })
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET data about a director by name
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.findOne({ 'Director.Name': req.params.name })
    .then((movie) => {
      res.status(200).json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET all users
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST create new user
/* JSON expected in the following format:
  {
    ID: Integer
    Username: String, (required),
    Password: String, (required),
    Email: String, (required),
    Birthday: Date
  } */
app.post('/users',
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], async (req, res) => {
    let errors = validationResult(req); // Check the validation object for errors
  
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
  let hashedPassword = Users.hashPassword(req.body.Password); // Hash any password entered by user when registering before storing it in the MongoDB database
  await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) { // If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            ID: req.body.Id,
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
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

// PUT users to update their user info (username)
/* JSON expected in the following format:
  {
    Username: String, (required),
    Password: String, (required),
    Email: String, (required),
    Birthday: Date
  } */
app.put('/users/:Username', passport.authenticate('jwt', { session: false }),
  [
    check('Username', 'Username requires five character minimum').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty()
  ], async (req, res) => {

  if (req.user.Username !== req.params.Username) {
    return res.status(400).send('Permission denied');
  }

  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday
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
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
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

// DELETE allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
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

// DELETE a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
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

app.use((req, res) => {
  res.status(404).send('Page Not Found!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
});