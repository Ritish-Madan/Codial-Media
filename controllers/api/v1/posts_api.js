/* In order to import posts, we need to import Post Schema here */
const Post = require('../../../schema/posts');
const Comment = require('../../../schema/comments');
const { json } = require('express');

module.exports.index = async function(req, res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate({
        path: 'comments'
    })

    res.status(200).json({
        message: 'Lists of Posts',
        posts: posts
    })
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: post.id});

            return res.status(200).json({
                message: 'Posts and associated comments deleted'
            });
        }else{
            return res.status(401).json({
                message: 'Un-Authorized Action'
            });
        };
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error, contact developer',
            contact: 'contact.ritish31@gmail.com'
        });
    };
};