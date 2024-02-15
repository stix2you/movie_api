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
passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, callback) => {
            console.log('${username} ${password}');
            await Users.findOne({ username: username })
                .then((user) => {
                    if (!user) {
                        console.log('incorrect username');
                        return callback(null, false, {
                            message: 'Incorrect username or password.',
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


// set up JWT authentication code below
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // extracts bearer token
    secretOrKey: '1234567890qwertyuiop'     // this sets the key I will use
},
    async (jwtPayload, callback) => {
        return await Users.findById(jwtPayload._id)
            .then((user) => {
                return callback(null.user);
            })
            .catch((error) => {
                return callback(error)
            });
    }));
