// This authenticates login requests using basic HTTP authentication, then generates a JWT for the user
// Uses LocalStrategy from passport.js file to check that the username/password in the body of the request exist in the database
// IF they exist, THEN use generateJWTToken() function to creat a JWT based on username/password, AND send JWT to client
// IF username/password don't exist, return error message received from LocalStrategy to client

/**
 * @file auth.js
 * @description Authenticates login requests using basic HTTP authentication and generates a JWT for the user.
 */

const jwtSecret = '1234567890qwertyuiop';  // must be same key used in JWTStrategy in passport.js

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport');  // imports the local passport file

/**
 * Generates a JWT token for the user.
 * @param {Object} user - The user object.
 * @returns {string} - The JWT token.
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.username,   // this is the username being encoded in the JWT
        expiresIn: '7d',
        algorithm: 'HS256'  // this is the algorithm used to "sign" or encode the values of the JWT
    });
}

/**
 * POST login route.
 * @param {Object} router - The router object.
 */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                console.log('Hello');
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
}