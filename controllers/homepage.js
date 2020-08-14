// Importing the Posts Schema in order to fetch out the posts from the DB
const Post = require('../schema/posts');
// Importing users to search
const Users = require('../schema/userSchema');

// Opening homepage
module.exports.home = function(req, res){
    Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user',
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log("Error occured while finding the posts");
            return;
        }
        Users.find({}, function(err, users){
            if(err){console.log('Error Occured while searching friends'); return;}

            return res.render('index',{
                posts: posts,
                all_users: users
            });
        })
    })
};

// Opening sign-up form
module.exports.registration = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('signup');
}

// Opening sign-in form

module.exports.check = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('sign_in');
}