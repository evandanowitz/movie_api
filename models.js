// FILE DEFINES THE SCHEMAS (DATA STRUCTURES) FOR MOVIES AND USERS (INCLDUING THEIR RELATIONSHIPS AND METHODS FOR PASSWROD HANDLING) USING MONGOOSE, A MONGODB OBJECT MODELING TOOL

const mongoose = require('mongoose'); // Imports the 'mongoose' module for MongoDB object modeling
const bcrypt = require('bcrypt'); // Imports the 'bcrypt' module for password hashing. Used for hashing passwords securely before storing them in database

// MOVIE SCHEMA

let movieSchema = mongoose.Schema({ // Defines the schema for movies using Mongoose's 'Schema' class
  // Specifies various fields such as 'Title', 'Description', 'Genre', 'Director', 'ImagePath', and 'Featured'. Some feilds have other specifications like 'Type' and whether they are required
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: Date,
    Death: Date
  },
  ImagePath: String,
  Featured: Boolean
});

// USER SCHEMA

let userSchema = mongoose.Schema({ // Defines the schema for users using Mongoose's 'Schema' class
  // Specifies various fields such as 'Username', 'Password', 'Email', 'Birthday', and 'FavoriteMovies'
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}] // 'FavoriteMovies' is an array of 'ObjectId' references to the 'Movie' model
});

// PASSWORD HASHING METHODS. DEFINES STATIC AND INSTANCE METHODS FOR PASSWORD HASHING AND VALIDATION

// 'hashPassword' is a static method that hashes a password using 'bcrypt' with a cost factor of 10
userSchema.statics.hashPassword = (password) => { // 'userSchema.statics' is a way to add static methods (functions) directly to the model ('User' model), making them accessible on the model itself rather than instances of the model. 'hashPassword' is the name of the static method being defined.
  return bcrypt.hashSync(password, 10); // 'bcrypt.hashSync' is a function from the 'bcrypt' library used to hash a password synchronously. 'password' is the plaintext password to be hashed. '10' is the cost factor and represents the number of salt rounds, which determines the complexity of the hashing algorithm. Higher the cost factor = the longer it takes to hash the password = more secure.
};

// 'validatePassword' is an instance method that compares a plain text password with the hashed password stored in the user document in the database
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password); // bcrypt is used to compare hashed passwords during the authentication process
};

// MOVIE AND USER MODELS

let Movie = mongoose.model('Movie', movieSchema); // Creates instance of Mongoose model for 'Movie' using the 'movieSchema' schema
let User = mongoose.model('User', userSchema); // Creates instance of Mongoose model for 'User' using the 'userSchema' schema

// EXPORTING MODELS

module.exports.Movie = Movie; // Exports the movie model for use in other parts/files of the app
module.exports.User = User; // Exports the user model for use in other parts/files of the app

// Summary
  /*
    'LocalStrategy' is for handling username/password-based authentication.
    'JWTStrategy' is for handling authentication using JSON Web Tokens (JWT).
    'secretOrKey' is the secret key used to verify the signature of the JWT (decode it).
    'bcrypt' is a library for securely hashing and comparing passwords.
  */