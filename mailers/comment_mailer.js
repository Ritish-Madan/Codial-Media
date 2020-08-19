const nodemailer = require('../config/nodemailer');


// Exporting method
exports.newComment = (comment) => {
    let htmlData = nodemailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');

    nodemailer.transporter.sendMail({
        from: 'contact.ritish@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published!',
        html: htmlData
    }, (err, info) => {
        if(err){return console.log('Error in sending Email', err);}

        return console.log('Message Sent', info);
    });
};