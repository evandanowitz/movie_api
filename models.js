/**
 * @file models.js
 * @description Defines Mongoose schemas for Movies and Users, including methods for password handling.
 */

const mongoose = require("mongoose"); // Import Mongoose for MongoDB object modeling.
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing.

/**
 * Movie Schema
 * Defines the structure of movie documents stored in the database.
 * @type {mongoose.Schema}
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true }, // Movie title (required).
  Description: { type: String, required: true }, // Movie description (required).
  Genre: {
    Name: String, // Genre name.
    Description: String, // Genre description.
  },
  Director: {
    Name: String, // Director's name.
    Bio: String, // Director's biography.
    Birth: Date, // Director's birth date.
    Death: Date, // Director's death date (if applicable).
  },
  ImagePath: String, // URL or path to the movie's page.
  Featured: Boolean, // Boolean to indicate if the movie is featured.
});

/**
 * User Schema
 * Defines the structure of user documents stored in the database.
 * @type {mongoose.Schema}
 */
let userSchema = mongoose.Schema({
  Username: { type: String, required: true }, // Username (required).
  Password: { type: String, required: true }, // Password (required).
  Email: { type: String, required: true }, // Email address (required).
  Birthday: Date, // User's birthday (optional).
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], // Array of favorite movies (references to the Movie model).
});

/**
 * Hashes a password before saving it to the database.
 * @function hashPassword
 * @param {string} password - The paintext password to be hashed.
 * @returns {string} - The hashed password.
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10); // Hash the password with a salt factor of 10.
};

/**
 * Compares a given password with the stored hash password.
 * @function validatePassword
 * @param {string} password - The plaintext password to validate.
 * @returns {boolean} - Returns true if the password is valid, false otherwise.
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password); // Compare the plaintext password with the hashed password.
};

// Create Mongoose models for Movies and Users using the defined schemas.
let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

// Export the Movie and User models for use in other parts of the application.
module.exports.Movie = Movie;
module.exports.User = User;
