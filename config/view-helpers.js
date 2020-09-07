const env = require('./enviroment');
const fs = require('fs');
const path = require('path');

module.exports = (app) =>{
    app.locals.assetPath = function(filePath){
        // When we are in development mode, we just go to the filePath
        if(env.name == 'development'){
            return filePath
        }else{
            // If the production mode is there
            return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];

        }
    }
}