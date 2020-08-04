/*--------------------------------------------------------------------------------------------------------
File Containes the Passport Authentication Strategies, required in the website. The code is generalized,
you may change as per the latest security trends as per specific documentations.
----------------------------------------------------------------------------------------------------------*/

// Importing passport Libraries
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

// Importing Schema
const User = require('../schema/userSchema');

// Authentication using passport
passport.use(new passportLocal({
    usernameField: 'email'
}, function(email, password, done){
    User.findOne({email:email}, function(err, user){
        if(err){
            console.log("Error finding the user in passport strategy", err);
            return done(err);
        }
        if(!user || user.password != password){
            console.log("Username or password is incorrect. Please re-check credentials");
            return done(null, false);
        }
        return done(null, user);
    });
}
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("Error finding the user during deserializing.");
            return done(err);
        }
        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    return res.redirect('/sign-in');
};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
         res.locals.user = req.user;
    };
    next();
};

// Expo
module.exports = passport;
