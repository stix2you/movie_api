const mongoose = require('mongoose');

// Password hashing using bcrypt
const bcrypt = require('bcrypt');

// Define SCHEMAS for Users, Movies, Genres, Directors, Actors
let userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: true },
    favorite_movies: [{ type: mongoose.Schema.Types.String, ref: 'Movie' }]
});

// this function hashes the password
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);   // 10 is the number of rounds to process the data for
};

// this function compares the hashed password in database to the password entered by the user
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

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

let genreSchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
});

let directorSchema = mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    birthDate: Date,
    deathDate: Date,
    bio: { type: String, required: true },
    movies: [{ type: mongoose.Schema.Types.String, ref: 'Movie' }],
    imagePath: { type: String, required: true }
});

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

