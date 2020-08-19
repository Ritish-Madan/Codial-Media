const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');



const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'contactritish31',
        pass: 'g38%d8dh'
    }
});

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