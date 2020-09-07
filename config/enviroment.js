// Importing filesystem 
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

// Logging directory
const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahblah',
    db: 'Authentication',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'contactritish31',
            pass: 'g38%d8dh'
        }
    },
    google_client_id: '834564121562-6i3fvv45qrdugfo28hlnba1qdfmu8ukn.apps.googleusercontent.com',
    google_client_secret: 'rNq-hdbWcdpN2F24SCPfIlnR',
    google_callback_url: "http://localhost:8000/user/auth/google/callback",
    jwt_secret: 'codial',
    morgan:{
        mode: 'dev',
        options: {stream: accessLogStream}
    }

} /* development closing */

const production = {
    name: 'production',
    asset_path: './public/assets',
    session_cookie_key: 'HabFxFGGiXn9TMEwELIAbQ6nRCDIy2Xu',
    db: 'Authentication',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'contactritish31',
            pass: 'g38%d8dh'
        }
    },
    google_client_id: '834564121562-6i3fvv45qrdugfo28hlnba1qdfmu8ukn.apps.googleusercontent.com',
    google_client_secret: 'rNq-hdbWcdpN2F24SCPfIlnR',
    google_callback_url: "http://localhost:8000/user/auth/google/callback",
    jwt_secret: 'zx8qaNifAmuR2lHe4N0G716ywEw9IF7V',
    morgan:{
        mode: 'combined',
        options: {stream: accessLogStream}
    }

} /* production closing */



module.exports = eval(process.env.CODIAL_ENVIROMENT) == undefined ? development: eval(process.env.CODIAL_ENVIROMENT); 