/**
 * @file index.js
 * @description Entry point for the myFlix API. Sets up Express server, routes, and connects to MongoDB.
 */

const express = require('express'),
   app = express(),
   bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import express-validator
const { check, validationResult } = require('express-validator');

// import cors 
const cors = require('cors');

//app.use(cors());  // allows all domains to access the API -- disabled for security reasons

// to allow only certain origins to access the API.  
// creates a list of allowed domains within the variable allowedOrigins, 
// then compares the domains of any incoming request with this list and either 
// allows it (if the domain is on the list) or returns an error (if the domain isn’t on the list)
let allowedOrigins = [
   'http://localhost:8080',
   'http://localhost:4200',
   'http://localhost:1234',
   'http://testsite.com',
   'https://stix2you.github.io',
   'https://myflix-dhill-portfolio-site.netlify.app',
   'http://stix2you-myflix-client.s3-website.us-east-2.amazonaws.com',
   'https://stix2you-myflix-client.s3.us-east-2.amazonaws.com/'
   
];
app.use(cors({
   origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
         let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
         return callback(new Error(message), false);
      }
      return callback(null, true);
   }
}));

// import auth.js file
let auth = require('./auth')(app);  // app argument ensures Express is available in the auth.js file

// require the Passport module, import passport.js below
const passport = require('passport');
require('./passport');

// Imports or "requires" the Mongoose package, and the models we defined in the models.js file
const mongoose = require('mongoose');
const Models = require('./models.js');

// so the variables 'Movies' and 'User' (etc..) will point to the MODEL NAMES we defined in models.js
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;
const Actors = Models.Actor;

/**
 * This function returns a welcome message to the user
 * @route GET /
 * @description - empty endpoint - starting point for the API
 * @group Welcome - Welcome message
 * @returns {string} Welcome message
 */
app.get('/', (req, res) => {
   res.send('Welcome to myFlix Movie App!');
});


// Health check endpoint
app.get('/health', (req, res) => {
   res.status(200).send('OK');
 });


/**
 * Return a list of all movies
 * @route GET /movies
 * @group Movies - Operations about movies
 * @returns {object} 200 - An array of movies
 * @returns {Error}  default - Unexpected error
 */
app.get('/movies', passport.authenticate('jwt', { session: false }),  // 'session: false' tells Passport not to create a server-side session
   async (req, res) => {  // async function allows us to use the 'await' keyword, req and res are objects representing the HTTP request and response
      await Movies.find()
         .then((movies) => {
            res.status(201).json(movies);
         })
         .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
         });
   });

/**
 * Return data about a single movie by title
 * @route GET /movies/:Title
 * @group Movies - Operations about movies
 * @param {string} Title.path.required - Movie title
 * @returns {object} 200 - A movie object
 * @returns {Error}  default - Unexpected error
 */
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      await Movies.findOne({ Title: req.params.Title })
         .then((movies) => {
            res.json(movies);
         })
         .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
         });
   });

/**
 * Return data about a genre by name
 * @route GET /genres/:name
 * @group Genres - Operations about genres
 * @param {string} name.path.required - Genre name
 * @returns {object} 200 - A genre object
 * @returns {Error}  default - Unexpected error
 */
app.get('/genres/:name', passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      await Genres.findOne({ name: req.params.name })
         .then((genres) => {
            res.json(genres);
         })
         .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
         });
   });

/**
 * Return data about a director by name
 * @route GET /directors/:name
 * @group Directors - Operations about directors
 * @param {string} name.path.required - Director name
 * @returns {object} 200 - A director object
 * @returns {Error}  default - Unexpected error
 */
app.get('/directors/:name', passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      await Directors.findOne({ name: req.params.name })
         .then((name) => {
            res.json(name);
         })
         .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
         });
   });


/**
 * Add a user
 * @route POST /users
 * @group Users - Operations about users
 * @param {string} username.body.required - Username
 * @param {string} password.body.required - Password
 * @param {string} email.body.required - Email
 * @param {string} birthday.body - Birthday
 * @returns {object} 201 - User created
 * @returns {Error}  default - Unexpected error
 */
app.post('/users', [
   check('username', 'Username is required').isLength({ min: 5 }),  // checks if the username is at least 5 characters long
   check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),  // checks if the username contains only alphanumeric characters
   check('password', 'Password is required').not().isEmpty(),  // checks if the password is not empty
   check('email', 'Email does not appear to be valid').isEmail()  // checks if the email is valid
], async (req, res) => {
   // check the validation object for errors
   let errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });  // if there are errors, return a 422 response with a JSON object containing the error messages
   }

   // Hash the password
   let hashedPassword = Users.hashPassword(req.body.password);  // hashPassword is a method defined in the models.js file, req.body.Password is the password passed from the user
   // check to see if the user already exists:
   await Users.findOne({ username: req.body.username })  // uses the findOne method to look for a user with the same username, req.body.username is the username passed from the user
      .then((user) => {
         if (user) {
            return res.status(400).send(req.body.username + 'already exists');  // If the user is found, send a response that it already exists and exit the function
         } else {
            // Create the user.  req.body is the information passed from the user.  Creates a new USER DOCUMENT
            Users
               .create({  // create method is used to create a new document in the database
                  username: req.body.username,
                  password: hashedPassword,   // hashed password !!!
                  email: req.body.email,
                  birthday: req.body.birthday
               })
               // Now takes the document just added and sends it back to the user along with a status message. 
               // Note: CALLBACK function is within the promise, not in the main function.   
               .then((user) => { res.status(201).json(user) })
               .catch((error) => {
                  console.error(error);
                  res.status(500).send('Error: ' + error);
               })
         }
      })
      // .catch function will catch any problems Mongoose encounters while running the create command.
      .catch((error) => {
         console.error(error);
         res.status(500).send('Error: ' + error);
      });
});

/**
 * Update user information
 * @route PUT /users/:Username
 * @group Users - Operations about users
 * @param {string} Username.path.required - Username
 * @param {string} username.body - New username
 * @param {string} password.body - New password
 * @param {string} email.body - New email
 * @param {string} birthday.body - New birthday
 * @returns {object} 200 - Updated user object
 * @returns {Error}  default - Unexpected error
 */
app.put('/users/:Username', [
   // Include validation checks for fields only if they need to be validated
   check('username')
      .optional({ checkFalsy: true })
      .isAlphanumeric().withMessage('Username contains non alphanumeric characters - not allowed.'),
   check('email')
      .optional({ checkFalsy: true })
      .isEmail().withMessage('Email does not appear to be valid'),
], passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      // check the validation object for errors
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      // Construct update object based on provided fields
      let updateObject = {};
      if (req.body.username) updateObject.username = req.body.username;
      if (req.body.password) updateObject.password = Users.hashPassword(req.body.password);
      if (req.body.email) updateObject.email = req.body.email;
      if (req.body.birthday) updateObject.birthday = req.body.birthday;

      // Proceed with update only if there's at least one field to update
      if (Object.keys(updateObject).length > 0) {
         try {
            const updatedUser = await Users.findOneAndUpdate(
               { username: req.params.Username },
               { $set: updateObject },
               { new: true, runValidators: true } // Ensure new document is returned and validators run
            );
            res.json(updatedUser);
         } catch (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
         }
      } else {
         res.status(400).send('No update fields provided');
      }
   });

/**
 * Add a movie to a user's list of favorites
 * @route POST /users/:username/movies/:_id
 * @group Users - Operations about users
 * @param {string} username.path.required - Username
 * @param {string} _id.path.required - Movie ID
 * @returns {object} 200 - Updated user object
 * @returns {Error}  default - Unexpected error
 */
app.post('/users/:username/movies/:_id', passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      await Users.findOneAndUpdate({ username: req.params.username }, {
         $addToSet: { favorite_movies: req.params._id }
      },
         { new: true }) // This line makes sure that the updated document is returned
         .then((updatedUser) => {
            res.json(updatedUser);
         })
         .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
         });
   });

/**
 * Delete a movie from a user's list of favorites
 * @route DELETE /users/:username/movies/:_id
 * @group Users - Operations about users
 * @param {string} username.path.required - Username
 * @param {string} _id.path.required - Movie ID
 * @returns {string} 200 - Confirmation message
 * @returns {Error}  default - Unexpected error
 */
app.delete('/users/:username/movies/:_id', passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      await Users.findOneAndUpdate({ username: req.params.username }, {
         $pull: { favorite_movies: req.params._id }
      },
         { new: true }) // This line makes sure that the updated document is returned
         .then((updatedUser) => {
            res.send(req.params._id + ' was deleted.');
            // res.json(updatedUser);            
         })
         .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
         });
   });

/**
 * Delete a user by username
 * @route DELETE /users/:username
 * @group Users - Operations about users
 * @param {string} username.path.required - Username
 * @returns {string} 200 - Confirmation message
 * @returns {Error}  default - Unexpected error
 */
app.delete('/users/:username', passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      await Users.findOneAndDelete({ username: req.params.username })
         .then((user) => {
            if (!user) {
               res.status(400).send(req.params.username + ' was not found');
            } else {
               res.status(200).send(req.params.username + ' was deleted.');
            }
         })
         .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
         });
   });

/**
 * Get all users
 * @route GET /users
 * @group Users - Operations about users
 * @returns {object} 200 - An array of users
 * @returns {Error}  default - Unexpected error
 */
app.get('/users', passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      await Users.find()
         .then((users) => {
            res.status(201).json(users);
         })
         .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
         });
   });

/**
 * Get a user by username
 * @route GET /users/:username
 * @group Users - Operations about users
 * @param {string} username.path.required - Username
 * @returns {object} 200 - A user object
 * @returns {Error}  default - Unexpected error
 */
app.get('/users/:username', passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      await Users.findOne({ username: req.params.username })
         .then((users) => {
            res.json(users);
         })
         .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
         });
   });

// START SERVER

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('Connected to MongoDB');
      const port = process.env.PORT || 8080;  // sets the port to 8080 if there is no PORT environment variable
      app.listen(port, '0.0.0.0', () => {
         console.log('Listening on Port ' + port);
      });
   })
   .catch(err => {
      console.error('Error connecting to MongoDB:', err);
   });


// mongoose.connect('mongodb://127.0.0.1:27017/myFlix')
//     .then(() => {
//         console.log('Connected to MongoDB');
//         const port = process.env.PORT || 8080;
//         app.listen(port, '0.0.0.0', () => {
//             console.log('Listening on Port ' + port);
//         });
//     })
//     .catch(err => {
//         console.error('Error connecting to MongoDB:', err);
//     });