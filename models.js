// DEFINE the schema for movies, keys and values
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},  // Data type: String with attached required type
    Description: {type: String, required: true},
    Genre: {
      Name: String,         // Data type: STRING
      Description: String
    },
    Director: {    // Data type: SUBDOCUMENT
      Name: String,
      Bio: String
    },
    Actors: [String],  // Data type: ARRAY
    ImagePath: String,
    Featured: Boolean    // Data type: BOOLEAN
  });
  
  // DEFINE the schema for users, keys and values
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]  
    // Data type: ARRAY which is REFERENCED... 
    // [] denotes array
    // mongoose.Schema.Types.ObjectiId denotes it's a reference ID
    // ref:'Movie' denotes it's coming from db.moves collection
  });
  
// let movieSchema = mongoose.Schema({
//     _id: {type: String, required: true},
//     Title: {type: String, required: true},
//     ReleaseYear: String,
//     Rating: String,
//     Runtime: String,
//     Description: {type: String, required: true},
//     Genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
//     Director: {type: String, required: true},
//     Actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
//     ImagePath: String,
//     Featured: Boolean
// });

// let genreSchema = mongoose.Schema({
//     _id: {type: String, required: true},
//     name: {type: String, required: true},
//     description: {type: String, required: true}
// });

// let directorSchema = mongoose.Schema({
//     _id: {type: String, required: true},
//     name: {type: String, required: true},
//     birthDate: Date,
//     deathDate: Date,
//     bio: {type: String, required: true}, 
//     movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
//     imagePath: {type: String, required: true}
// })

// let actorSchema = mongoose.Schema({
//     _id: {type: String, required: true},
//     name: {type: String, required: true},
//     birthDate: Date,
//     deathDate: Date,
//     bio: {type: String, required: true},
//     movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
//     imagePath: {type: String, required: true}
// })

  // Create the MODELS which use the SCHEMAS we just defined
  let Movie = mongoose.model('Movie', movieSchema);
  let User = mongoose.model('User', userSchema);
  
  // Export the MODELS so they may be used in the index.js file
  module.exports.Movie = Movie;
  module.exports.User = User;

