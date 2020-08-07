// Importing Post Schema
const Post = require('../schema/posts');
const Comment = require('../schema/comments')

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
                }
            })
        }

        req.flash('success', 'Post Published');
        return res.redirect('back');
    }catch(err){
        req.flash('error', 'Error Occured, Please Contact Support!');
        console.log('Error Occured while creating the post', err);
        return res.redirect('back');
    }
}

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
            // Testing bug above
            console.log('Authorisation Denied')
            return res.redirect('back');
        };

    });
};
