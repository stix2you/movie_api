/**
 * @file passport.js
 * @description Configures Passport strategies for local authentication and JWT verification.
 */

// imports components stores them in variables to use
const passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

// imports sub-components
let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

// takes username and password from the request body and uses Mongoose to check the database for a user with the same username
/**
 * Local strategy for username and password login
 */
passport.use(
    new LocalStrategy( // this is a new instance of the LocalStrategy
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        
        async (username, password, callback) => {
            console.log('${username} ${password}');    // logs the username and password to the console
            await Users.findOne({ username: username })  // uses the findOne method to look for a user with the same username
                .then((user) => {                  // if the user is found, the then method will be called
                    if (!user) {  // if the user is not found, return a message
                        console.log('incorrect username');
                        return callback(null, false, {
                            message: 'Incorrect username or password.',
                        });
                    }
                    if (!user.validatePassword(password)) {   // if the password is incorrect, return a message, validatePassword hashes password, from models.js
                        console.log('incorrect password');
                        return callback(null, false, { message: 'Incorrect password.' });   
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


// set up JWT authentication code below
/**
 * JWT strategy for token verification
 */
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // extracts bearer token
    secretOrKey: '1234567890qwertyuiop'     // this sets the key I will use
},
    async (jwtPayload, callback) => {
        return await Users.findById(jwtPayload._id)
            .then((user) => {
                return callback(null, user);
            })
            .catch((error) => {
                return callback(error)
            });
    }));
