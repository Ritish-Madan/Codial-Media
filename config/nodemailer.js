const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('../config/enviroment');



const transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, Template){
            if(err){return console.log('Error rendering Template', err);}
            
            mailHTML = Template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}