const Like = require('../schema/likes');
const Comment = require('../schema/comments');
const Post = require('../schema/posts');

module.exports.like = async function(req, res){
    try{
        let deleted = false;
        let likeable;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        let existingLikes = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user.id
        })

        // If like already exists
        if(existingLikes){
            likeable.likes.pull(existingLikes._id);
            likeable.save();

            existingLikes.remove();
            deleted = true;
        }else{
            let newLike = await Like.create({
                user: req.user.id,
                likeable: req.query.id,
                onModel: req.query.type
            })

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.status(200).json({
            message: 'request successful',
            data: deleted
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    };
};