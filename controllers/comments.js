const Comment = require('../schema/comments');
const Post = require('../schema/posts');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post, // We could have done the post._id as we have found the post.
            user: req.user._id 
        });
            post.comments.push(comment);
            post.save(); // We need to tell the DB to save the update we did. Else won't be saved.

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment: comment
                    },
                    message: 'Comment Created Sucessfully!'
                })
            }
            
            return res.redirect('back');
        }else{
            console.log('Invalid Post');
            return res.redirect('back');
        };
    }catch(err){
        console.log('Error in creating the comment', err);
        return;
    }
};

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.query.id);
        /* Authorization to both the parties, who made the post, and who made the comment */
        if(req.user.id == comment.user || req.user.id == req.query.userID){
            let postID = comment.post; // Stored the post id for further deletion from array

            /* We did store the Post id before, because we do not need the Post comments array to delete
            before we remove the comment from database, if that get's an error, so we do not let the 
            comment to delete from list only. Both of them must be deleted. */

            comment.remove();
            let post  = await Post.findByIdAndUpdate(postID, {$pull : {comments : req.query.id}});
            return res.redirect('back');
        }else{
            console.log('You are not authorized to delete this comment!');
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error in deleting the comment", err);
        return;
    }
};
// module.exports.create = async function(req, res){
//     let post = await Post.findById(req.body.post);
//     if(post){
//         let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post, // We could have done the post._id as we have found the post.
//                 user: req.user._id
//             })
//         post.comments.push(comment);
//         post.save(); // We need to tell the DB to save the update we did. Else won't be saved.
//         // XHR request call
        
//         return res.redirect('back');
//         }else{
//             console.log('Invalid Post');
//             return res.redirect('back');
//         }
// }