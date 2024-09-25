/**
 * @file passport.js
 * @description Configures Passport.js for user authentication using Local and JWT strategies.
 */

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/**
 * Local strategy for user login using a username and a password.
 * @strategy LocalStrategy
 * @param {string} username - The username entered by the user.
 * @param {string} password - The password entered by the user.
 * @param {function} callback - Callback function to return the result of the authentication.
 */
passport.use (
  new LocalStrategy (
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      
      await Users.findOne({ Username: username })
        .then((user) => {
          if (!user) {
            console.log('incorrect username');
            return callback(null, false, {
              message: 'Incorrect username or password.',
            });
          }

          /**
           * Validate the provided password against the stored password.
           * If the password is incorrect, send an error response.
           */
          if (!user.validatePassword(password)) {
            console.log('incorrect password');
            return callback(null, false, { // Return message indicating that user authentication failed.
              message: 'Incorrect password',
            });
          }

          console.log('finished');
          return callback(null, user); // Return the authenticated user.
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            return callback(error); // Return an error response.
          }
        });
    }
  )
);

/**
 * JWT strategy to authenticate users based on the JWT in the request.
 * @strategy JWTStrategy
 * @param {object} jwtPayload - The JWT payload containing the user ID.
 * @param {function} callback - Callback fucntion to return the result of the authentication.
 */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header as a bearer token.
      secretOrKey: 'your_jwt_secret' // Secret key used to decode the JWT.
    },
    async (jwtPayload, callback) => {
      return await Users.findById(jwtPayload._id) // Find user by the ID in the JWT payload.
        .then((user) => {
          return callback(null, user); // Return the authenticated user.
        })
        .catch((error) => {
          return callback(error); // Return an error response if there is an issue.
        });
    }
  )
);