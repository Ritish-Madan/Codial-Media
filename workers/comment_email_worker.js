const queue = require('../config/kue');

const commentMailer = require('../mailers/comment_mailer');

queue.process('emails', function(job, done){
    console.log('emails worker is processing a job');
    commentMailer.newComment(job.data);

    done();
})