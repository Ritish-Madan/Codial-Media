// Importing passport and required libraries
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
// User Schema to get the user details and create a new user
const User = require('../schema/userSchema');

// Google OAuthentication Strategy (With Documentation)

passport.use(new GoogleStrategy({
    clientID: '834564121562-6i3fvv45qrdugfo28hlnba1qdfmu8ukn.apps.googleusercontent.com',
    clientSecret: 'rNq-hdbWcdpN2F24SCPfIlnR',
    callbackURL: "http://localhost:8000/user/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){return console.log('OAuth (Google) error occurred', err);}

            // testing codes
            console.log(accessToken, refreshToken);
            console.log(profile);
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