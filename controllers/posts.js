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
                },
                message: "Post Published!"
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

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: post.id});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: 'Post Deleted!'
                })
            }
            req.flash('success', 'Post Deleted');
            return res.redirect('back');
        }else{
            // Testing bug above
            console.log('Authorisation Denied')
            return res.redirect('back');
        };
    }catch(err){
        console.log('Error Deleting the post', err);
    }

    }
