// Importing the Posts Schema in order to fetch out the posts from the DB
const Post = require('../schema/posts');
<<<<<<< HEAD
// Importing users to search
const Users = require('../schema/userSchema');
const User = require('../schema/userSchema');
=======

>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4
// Opening homepage
module.exports.home = function(req, res){
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
<<<<<<< HEAD
            path: 'user',
=======
            path: 'user'
>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log("Error occured while finding the posts");
            return;
        }
<<<<<<< HEAD
        Users.find({}, function(err, users){
            if(err){console.log('Error Occured while searching friends'); return;}

            return res.render('index',{
                posts: posts,
                all_users: users
            });
        })
=======
        return res.render('index',{
            posts: posts
        });
>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4
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