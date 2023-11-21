const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy, // Defines basic HTTP authentication for login requests
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

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
        // Hash any password entered by user when logging in before comparing it to password stored in MongoDB
        if (!user.validatePassword(password)) { // RETURN TO THIS FROM EXERCISE
          console.log('incorrect password');
          return callback(null, false, {
            message: 'Incorrect password',
          });
        }
        console.log('finished');
        return callback(null, user);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
      })
    }
  )
);

passport.use(new JWTStrategy({ // JWT authentication code. Allows you to authenticate users based on the JWT submitted alongside their request
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // JWT is extracted from the header of the HTTP request. This JWT is called the "bearer token"
  secretOrKey: 'your_jwt_secret' // Secret key needed to verify signature of the JWT
}, async (jwtPayload, callback) => {
  return await Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error);
    })
}));