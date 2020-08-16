// Importing passport
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// Importing userSchema
const User = require('../schema/userSchema');

// JWT setup
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codial'
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    // console.log(jwtPayload);
    User.findById(jwtPayload._id, function(err, user){
        if(err){
            console.log('Error in finding user in JWT', err);
            return;
        };
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        };
    });
}));

module.exports = passport;
