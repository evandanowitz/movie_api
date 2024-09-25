/**
 * @file auth.js
 * @description Handles user authentication using JWT (JSON Web Tokens).
 */

const jwtSecret = 'your_jwt_secret'; // Initializes the JWT secret key

const jwt = require('jsonwebtoken'),
  passport = require('passport');
  require('./passport'); // Import local passport strategy

/**
 * Generates a JWT token for a given user.
 * @param {object} user - The user object to encode into the JWT.
 * @param {string} - The generated JWT token.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // Username in encoded in the JWT.
    expiresIn: '7d', // Token expires in seven days.
    algorithm: 'HS256' // Algorithm used to sign the token.
  });
}

/**
 * Authenticates user on login and generates a JWT token.
 * @param {object} router - The Express router to define the POST '/login' endpoint.
 */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    // Use Passport's 'local' strategy to authenticate the user.
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        // If authentication fails, send an error message with the response.
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }

      /**
       * Logs in the user without creating a session.
       * 'req.login' is a Passport.js function that establishes a login session,
       * but since we are using JWT and not sessions (seesion: false),
       * it is used here to maintain compatibility with Passport.js.
       */
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }

        // Generate JWT for the authenticated user.
        let token = generateJWTToken(user.toJSON());
        // Return user and token in response.
        return res.json({ user, token });
      });
    })(req, res); // Immediately invoke the passport authentication method.
  });
}