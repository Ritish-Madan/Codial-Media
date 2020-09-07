// Importing passport and required libraries
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
// User Schema to get the user details and create a new user
const User = require('../schema/userSchema');
const env = require('../config/enviroment');

// Google OAuthentication Strategy (With Documentation)

passport.use(new GoogleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url
    },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){return console.log('OAuth (Google) error occurred', err);}

            // If the user already exists or logged in with the OAuth before
            if(user){
                return done(null, user);
            }else{ /* If the new user comes up we create the account for the user */
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex') /* Generating random password crypto */
                }, function(err, user){
                    if(err){return console.log('Error Creating OAuth User', err);}

                    return done(null, user);
                });
            };
        });
    }
));

module.exports = passport;