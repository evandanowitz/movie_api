// FILE HANDLES USER AUTHENTICATION USING JWT (JSON WEB TOKENS)

// JWT CONFIGURATION

const jwtSecret = 'your_jwt_secret'; // Initializes the JWT secret. Must be same key used in the JWTStrategy

const jwt = require('jsonwebtoken'), // Imports the 'jsonwebtoken' module
  passport = require('passport'); // Imports the 'passport' module
  require('./passport'); // Imports your local passport strategy file frrom the './passport' module

// JWT TOKEN GENERATION FUNCTION

let generateJWTToken = (user) => { // Takes a user object and generates a JWT token
  return jwt.sign(user, jwtSecret, { // Uses the 'jsonwebtoken' library to sign the token with the secret
    subject: user.Username, // Sets the subject to the user's username (username you're encoding in the JWT)
    expiresIn: '7d', // Specifies that the token will expire in 7 days
    algorithm: 'HS256' // Algorithm used to 'sign' or encode values of JWT
  });
}

// AUTHENTICATION (POST '/login') ENDPOINT

module.exports = (router) => { // Exports a function that takes a router as an argument to set up authentication routes (endpoints)
  router.post('/login', (req, res) => { // The router handles a POST request to the '/login' endpoint
    passport.authenticate('local', { session: false }, (error, user, info) => { // Uses passport to authenticate the user. The 'local' strategy uses the LocalStrategy you defined in passport.js
      // Here and below: If authentication fails, returns error message. If successful, logs in user aand provides a JWT token for subsequent authentication
      if (error || !user) { // If there is an error or the user is not found...
        return res.status(400).json({ // Responds with a 400 status and a JSON object conaining a message and the user info
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => { // If authentication is successful, it logs in the user without creating a session (session: false)
        if (error) { // If there is an error during the login process...
          res.send(error); // Responds with the error
        }
        let token = generateJWTToken(user.toJSON()); // If authentication is successful, it generates a JWT token using the 'generateJWTToken' function containing user info and...
        return res.json({ user, token }); // ...responds with a JSON object containing the user and the generated token
      });
    })(req, res);
  });
}