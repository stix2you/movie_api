/**
 * @file models.js
 * @description Defines Mongoose schemas and models for Users, Movies, Genres, Directors, and Actors.
 */

// Import mongoose to create the schemas and models
const mongoose = require('mongoose');
// Password hashing using bcrypt
const bcrypt = require('bcrypt');

/**
 * Define SCHEMAS for Users, Movies, Genres, Directors, Actors
 */
let userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    favorite_movies: [{ type: mongoose.Schema.Types.String, ref: 'Movie' }]
});

/**
 * Hashes the password
 * @param {string} password - The password to hash.
 * @returns {string} - The hashed password.
 */
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);   // 10 is the number of rounds to process the data for
};

/**
 * Compares hashed password with the entered password
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if passwords match, false otherwise.
 */
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

/**
 * Movie schema
 */
let movieSchema = mongoose.Schema({
    _id: { type: String, required: true },
    Title: { type: String, required: true },
    ReleaseYear: String,
    Rating: String,
    Runtime: String,
    Description: { type: String, required: true },
    Genres: [{ type: mongoose.Schema.Types.String, ref: 'Genre' }],
    Director: String,
    Actors: [{ type: mongoose.Schema.Types.String, ref: 'Actor' }],
    ImagePath: String,
    Featured: Boolean
});

/**
 * Genre schema
 */
let genreSchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});

/**
 * Director schema
 */
let directorSchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    birthDate: Date,
    deathDate: Date,
    bio: { type: String, required: true },
    movies: [{ type: mongoose.Schema.Types.String, ref: 'Movie' }],
    imagePath: { type: String, required: true }
});

/**
 * Actor schema
 */
let actorSchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    birthDate: Date,
    deathDate: Date,
    bio: { type: String, required: true },
    movies: [{ type: mongoose.Schema.Types.String, ref: 'Movie' }],
    imagePath: { type: String, required: true }
});

// Create the MODELS which use the SCHEMAS we just defined
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);
let Actor = mongoose.model('Actor', actorSchema);

// Export the MODELS so they may be used in the index.js file
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
module.exports.Actor = Actor;

