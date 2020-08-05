// Importing Post Schema
const Post = require('../schema/posts');
const Comment = require('../schema/comments')

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },
    function(err){
        if(err){
            console.log(err);
            return;
        }
        return res.redirect('back');
    });
};

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log('Eror while finding the post');
            return res.redirect('back');
        }

        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post: post.id}, function(err){
                if(err){return console.log('Error while delting the comments.');}

                return res.redirect('back')
            });
        }else{
            console.log(post.user);
            console.log(req.user.id);
            console.log(post.user == req.user.id);
            // Testing bug above
            console.log('Authorisation Denied')
            return res.redirect('back');
        };

    });
};
