// FILE CONFIGURES PASSPORT.JS FOR USER AUTHENTICATION USING THE LOCAL STRATEGY AND JWT STRATEGY

const passport = require('passport'), // Imports the 'passport' module for authentication
  LocalStrategy = require('passport-local').Strategy, // Imports the strategy 'passport-local' for authenticating  users based on a username amd password 
  Models = require('./models.js'), // Imports the 'models.js' file for accessing user models
  passportJWT = require('passport-jwt'); // Imports the 'passport-jwt' module for JSON Web Token (JWT) authentication

let Users = Models.User, // Declare variables for user model
  JWTStrategy = passportJWT.Strategy, // Declare variables for JWT strategy. Strategy for authenticating users using JSON Web Tokens (JWT)
  ExtractJWT = passportJWT.ExtractJwt; // Declare variables for JWT extraction method. References method for extracting JWT from the request

// LOCAL STRATGY - USER LOGIN

passport.use ( // Configure Passport to use a strategy
  new LocalStrategy ( // Use the local strategy
    {
      usernameField: 'Username', // Specify the field name for the username in the request
      passwordField: 'Password', // Specify the field name for the password in the request
    },
    async (username, password, callback) => { // Define a callback function for local authentication
      console.log(`${username} ${password}`); // Logs the received username and password to the console
      await Users.findOne({ Username: username }) // Find a provided user by the provided username
      .then((user) => { // Handles the result of the findOne() method query
        if (!user) { // If the user is not found...
          console.log('incorrect username'); // Logs 'incorrect username' to the console
          return callback(null, false, { // Returns an error response with the message below:
            message: 'Incorrect username or password.',
          });
        }
        // Hash any password entered by user when logging in before comparing it to password stored in MongoDB
        if (!user.validatePassword(password)) { // If the passwprd is incorrect...
          console.log('incorrect password'); // Logs 'incorrect password' to the console
          return callback(null, false, { // Returns an error response with the message below:
            message: 'Incorrect password',
          });
        }
        console.log('finished'); // Logs that the authentication process is finished to the console
        return callback(null, user); // Returns a successful response with the user info
      })
      .catch((error) => { // Handles any errors that occur during the authentication process
        if (error) { // If there is an error...
          console.log(error); // Logs the error to the console
          return callback(error); // Returns an error response
        }
      })
    }
  )
);

// JWT authentication code. Allows you to authenticate users based on the JWT submitted alongside their request
passport.use(new JWTStrategy({ // Configures Passport to use JWT strategy to extract the JWT from the authrozation header as a bearer token and use the provided secret key ('your_jwt_secret') for decoding
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Specifies how to extract the JWT from the request. JWT is extracted from the header of the HTTP request. This JWT is called the "bearer token"
  secretOrKey: 'your_jwt_secret' // Specify the secret key needed to verify the signature (decoding) of the JWT. It is the shared secret between the server and the client
}, async (jwtPayload, callback) => { // Define a callback function for JWT authentication
  return await Users.findById(jwtPayload._id) // Find a user by the user ID in the JWT payload
    .then((user) => { // Handle the result of the query
      return callback(null, user); // Return the authenticated user
    })
    .catch((error) => { // Handle any errors that occur during JWT authentication. If there is an error...
      return callback(error); // Return an error response
    })
}));