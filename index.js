const express = require('express');
const port = 8000;
const app = express();

// Connectting to Data base
const db = require('./config/database');

// Setting up templete engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
// Setting up layouts
const layout = require('express-ejs-layouts');

// Setting up cookies Parser
const cookieParser = require('cookie-parser');

// Importing the express-session
const session = require('express-session');

// Importing passport
const passport = require('passport')
const passportLocal = require('./config/passport-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth');

// Connect mongo to transfer the cookies to DataBase
const MongoStore = require('connect-mongo')(session);

// Importing Node-SASS Middleware into Node.JS
const sassMiddleware = require('node-sass-middleware')

// Connecting flash
const flash = require('connect-flash');
const customMware = require('./config/Middlewares');

// Middlewares
 app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix:  '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
app.use(layout);

app.use(session({
    name: "user_id",
    secret: 'blahblah', //TODO Change this during deployment
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err){
        if(err){return console.log('Unable to store cookies in DataBase');};
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/uploads', express.static('./uploads'));
app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if(err){
        return console.log("Error in initializing the server", err);
    }
    return console.log("Server is working fine");
})
