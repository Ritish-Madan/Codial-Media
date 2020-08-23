const nodemailer = require('../config/nodemailer');


// Exporting method
exports.forgetmail = (forgetDetails) => {
    let htmlData = nodemailer.renderTemplate({details: forgetDetails}, '/forget Password/forget_password.ejs');

    nodemailer.transporter.sendMail({
        from: 'contact.ritish@gmail.com',
        to: forgetDetails.user.email,
        subject: 'Reset Password',
        html: htmlData
    }, (err, info) => {
        if(err){return console.log('Error in sending Email', err);}

        return console.log('Message Sent');
    });
};