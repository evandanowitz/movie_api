// FILE CONFIGURES AN EXPRESS SERVER FOR MOVIE DB APP. HANDLES ROUTES (MOVIES/GENRES/DIRECTORS/USERS). IMPLEMENTS USER AUTHENTICATION(JWT) & LOGGING(MORGAN)

// Import necessary modules
const express = require('express'), // Imports Express framework, allowing you to create a web app with ease
  morgan = require('morgan'), // Imports Morgan middleware for logging HTTP requests. This line imports it. Later, will configure it to log requests
  fs = require('fs'), // Imports File System module, used for logging
  path = require('path'); // Imports Path module, used for logging
  mongoose = require('mongoose'); // Imports Mongoose, a MongoDB object modeling tool. Allowing you to interact with MongoDB using JS. Schema-based solution to model app data
  Models = require('./models.js'); // Imports 'models.js' file containing Mongoose models for the app
  cors = require('cors'); // Import CORS middleware for enabling Cross-Origin Resource Sharing. Used to define who can access your API
  const { check, validationResult } = require('express-validator'); // Imports validation functions fro mexpress-validator library. Used to validate incoming data

// Destructuring required models from 'models.js' file
const Movies = Models.Movie; // References Mongoose 'movies' model. Represents 'movies' collection in MongoDB db
const Users = Models.User; // References Mongoose 'users' model. Represents 'users' collection in MongoDB db

const app = express(); // Create an instance of express, which is the core of your app
app.use(express.json()); // Configures Express to use middleware to parse incoming JSON data
app.use(express.urlencoded({extended: true})); // Configures Express to use middleware to parse incoming URL-encoded data

// Set up CORS middleware, allowing requests from specified origins and rejecting others
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com']; // Defines array of allowed origins, specifying domains that may access the server
app.use(cors({ // Configures the Express app to use the CORS middleware
  // Defines a function to check the origin of an incoming request
  origin: (origin, callback) => { // 'origin' parameter reps the origin of the request. 'callback' is a function to be called with result of the CORS check
    if(!origin) return callback(null, true); // Handles case where request doesn't include an origin header. Allows request by calling 'callback(null, true);'
    if(allowedOrigins.indexOf(origin) === -1){ // Checks if the request's origin is not in the 'allowedOrigins' array
      let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin; // Creates error message indicating that the request's origin is not allwoed
      return callback(new Error(message ), false); // Calls the callback function with an error and 'false' to indicate that the request should be rejected
    } // Closes the if statement
    return callback(null, true); // If the request's origin is in the 'allowedOrigins' array, calls the callback with 'null' (no error) and 'true' to indicate that the request is allowed
  } // Closes the origion-checking function
}));

// Import authentication setup
let auth = require('./auth')(app); // Includes authentication middleware by requiring 'auth' file and passing 'app' instance to it
const passport = require('passport'); // Requires Passport module. Passport is middleware for authentication. This line imports it.
require('./passport'); // This line configures it using a file called 'passport.js'

// Connect to MongoDB database using the provided connection URI. 'CONNECTION_URI' is an environment variable and hides sensitive info
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// Creates a write stream for logging and configures Morgan to use this stream for logging HTTP requests
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public')); // Configures Express to serve static files from the 'public' directory

// Defines a GET route for the root endpoint ('/'), returning a welcome message to the user
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// Defines a GET route to serve the 'documentation.html' file from the 'public' directory
app.get('/documentation.html', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname});
});

// GET a list of ALL movies to the user
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => { // Uses Passport to ensure only authenticated users can access it
  await Movies.find() // Retrieves all movies from MongoDB database
    .then((movies) => { // If successful...
      res.status(201).json(movies); // Responds with a JSON array of movies and a status code of 201 (Created)
    })
    .catch((err) => { // If there is an error...
      console.error(err); // Logs the error
      res.status(500).send('Error: ' + err); // Responds with a status code of 500 (Internal Server Error)
    });
});

// GET data about a single movie by title to the user
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => { // Uses Passport for authentication
  await Movies.findOne({ 'Title': req.params.title }) // Finds a movie by its title in the database
    .then((movie) => { // If found...
      res.json(movie); // Responds with the movie details in JSON format
    })
    .catch((err) => { // If not found or there is an error...
      console.error(err); // Logs the error
      res.status(500).send('Error: ' + err); // Responds with a status code of 500 (Internal Server Error)
    });
});

// GET data about a genre by name
app.get('/genres/:name', passport.authenticate('jwt', { session: false }), async (req, res) => { // Uses Passport for authentication
  await Movies.findOne({ 'Genre.Name': req.params.name }) // Finds a movie by its genre in the database
    .then((movie) => { // If found...
      res.status(200).json(movie); // Responds with the movie details in JSON format and a status code of 200 (OK)
    })
    .catch((err) => { // If not found or there is an error...
      console.error(err); // Logs the error
      res.status(500).send('Error: ' + err); // Responds with a status code of 500 (Internal Server Error)
    });
});

// GET data about a director by name
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), async (req, res) => { // Uses Passport for authentication
  await Movies.findOne({ 'Director.Name': req.params.name }) // Finds a movie by its director's name in the database
    .then((movie) => { // If found...
      res.status(200).json(movie.Director); // Responds with the director's details in JSON format and a status code of 200 (OK)
    })
    .catch((err) => { // If not found or there is an error...
      console.error(err); // Logs the error
      res.status(500).send('Error: ' + err); // Responds with a status code of 500 (Internal Server Error)
    });
});

// GET all users
app.get('/users', passport.authenticate('jwt', { session: false }), async (req, res) => { // Uses Passport for authentication
  await Users.find() // Retrieves all users from the database
    .then((users) => { // If successful...
      res.status(201).json(users); // Responds with a JSON array of users and a status code of 201 (Created)
    })
    .catch((err) => { // If there is an error...
      console.error(err); // Logs the error
      res.status(500).send('Error: ' + err); // Responds with a status code of 500 (Internal Server Error)
    });
});

// GET a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => { // Uses Passport for authentication
  await Users.findOne({ Username: req.params.Username }) // Finds a user by their username in the database
    .then((user) => { // If found...
      res.json(user); // Responds with the user details in JSON format
    })
    .catch((err) => { // If not found or there is an error...
      console.error(err); // Logs the error
      res.status(500).send('Error: ' + err); // Responds with a status code of 500 (Internal Server Error)
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
    
    // Check the validation object for errors
    let errors = validationResult(req); // Validation checks for the incoming data data using the 'express-validator' library defined at the top of this file
    if (!errors.isEmpty()) { // If there are validation errors...
      return res.status(422).json({ errors: errors.array() }); // Responds with a status code of 422 (Unprocessable Entity) and an array of errors
    }
  
  let hashedPassword = Users.hashPassword(req.body.Password); // Hash password entered by user when registering before storing in database. Uses 'Users.hashPassword' method from the user model
  await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => { // Checks if the username already exists in the database
      if (user) { // If it does...
        return res.status(400).send(req.body.Username + ' already exists'); // Responds with a status code of 400 (Bad Request) and a message that it already exists
      } else { // If the username does not already exist...
        Users
          .create({ // Creates a new user in the database and...
            ID: req.body.Id,
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => {res.status(201).json(user)}) // Responds with the created user and a status code of 201 (Created)
          .catch((error) => { // If there is an error during the process...
            console.error(error); // Logs the error
            res.status(500).send('Error: ' + error); // Responds with a status code of 500 (Internal Server Error)
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
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), // Uses Passport for authentication
  [
    check('Username', 'Username requires five character minimum').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty()
  ], async (req, res) => {

  if (req.user.Username !== req.params.Username) { // Checks if the authenticated user has permission to update the specified user. If not...
    return res.status(400).send('Permission denied'); // Responds with a status code of 400 (Bad Request) and 'Permission denied' message
  }

  // Check the validation object for errors
  let errors = validationResult(req); // Validation checks for the incoming data data using the 'express-validator' library defined at the top of this file
  if (!errors.isEmpty()) { // If there are validation errors...
    return res.status(422).json({ errors: errors.array() }); // Responds with a status code of 422 (Unprocessable Entity) and an array of errors
  }

  let hashedPassword = Users.hashPassword(req.body.Password); // Hashes the user's new password using the 'Users.hashPassword' method from the user model
  await Users.findOneAndUpdate({ Username: req.params.Username }, { $set: // Uses Mongoose's 'findOneAndUpdate' function to find and update the user by username with the new data
    {
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // Makes sure that the updated document is returned
  .then((updatedUser) => { // If update is successful...
    res.json(updatedUser); // Responds with the updated user info in JSON format
  })
  .catch((err) => { // If there is an error during the process...
    console.error(err); // Logs the error
    res.status(500).send('Error: ' + err); // Responds with a status code of 500 (Internal Server Error)
  })
});

// POST a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => { // Uses Passport for authentication
  await Users.findOneAndUpdate({ Username: req.params.Username }, { // Updates user document in database, adding specified movie ID to 'FavoriteMovies' array
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }) // Makes sure that the updated document is returned
  .then((updatedUser) => { // If update is successful...
    res.json(updatedUser); // Responds with the updated user info in JSON format
  })
  .catch((err) => { // If there is an error during the process...
    console.error(err); // Logs the error
    res.status(500).send('Error: ' + err); // Responds with a status code of 500 (Internal Server Error)
  });
});

// DELETE allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => { // Uses Passport for authentication
  await Users.findOneAndUpdate({ Username: req.params.Username }, { // Updates user document in database,
    $pull: { FavoriteMovies: req.params.MovieID } // ...removing specified movie ID from 'FavoriteMovies' array
  },
  { new: true }) // Makes sure that the updated document is returned
  .then((updatedUser) => { // If update is successful...
    console.log('Updated User:', updatedUser); // Logs the updated user info
    res.json(updatedUser); // Responds with the updated user info in JSON format
  })
  .catch((err) => { // If there is an error during the process...
    console.error(err); // Logs the error
    res.status(500).send('Error: ' + err); // Responds with a status code of 500 (Internal Server Error)
  });
});

// DELETE a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => { // Uses Passport for authentication
  await Users.findOneAndRemove({ Username: req.params.Username }) // Attempts to find and remove user with specified username from database
  .then((user) => { // If...
    if (!user) { // ...user is not found...
      res.status(400).send(req.params.Username + ' was not found'); // Responds with a status code of 400 (Bad Request) and message indicating that the user was not found
    } else { // If user is found and successfully removed...
      res.status(200).send(req.params.Username + ' was deleted.'); // Responds with a status code of 200 (OK) and message indicating that the user was deleted
    }
  })
  .catch((err) => { // If there is an error during the process...
    console.error(err); // Logs the error
    res.status(500).send('Error: ' + err); // Responds with a status code of 500 (Internal Server Error)
  });
});

// Error-Handling Middleware function for 404 (Not Found) errors. Must be placed after all other routes. A global error handler
app.use((req, res) => { // If no route matches the incoming request...
  res.status(404).send('Page Not Found!'); // Responds with a 404 message
});

// Error-Handling Middleware function for 500 (Internal Server Error) errors. Must be placed after all other routes. A global error handler
app.use((err, req, res, next) => { // If there are any unhandled errors...
  console.error(err.stack); // Logs the error stack
  res.status(500).send('Something broke!'); // Responds with a 500 message
});

// Set up server to listen on a specified port
const port = process.env.PORT || 8080; // Retrieved from the environment variable 'PORT' or defaulting to 8080
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port); // Logs a message when the server is successfully listening
});