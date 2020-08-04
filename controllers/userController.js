/*---------------------------------------------------------------------------------------------------------
Developer's Note ---> Do not change until you know what you are doing, changed might lead to serious security 
issues for users and might get at potential risks. 
-----------------------------------------------------------------------------------------------------------*/
// Importing user Schema
const User = require('../schema/userSchema')
<<<<<<< HEAD
// profile page of other users
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log('Error finding the users in friends');
            return res.redirect('/');
        }
        return res.render('user_profile',{
            user_profile: user
        });
    })
}

module.exports.update = function(req, res){
    if(req.params.id == req.user.id){
        User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
            if(err){
                console.log('Error in updating the user');
                return res.redirect('back');
            }
            return res.redirect('back')
        })
    }else{
        console.log('Not Authorized!!!');
        return res.redirect('back');
    }
=======

// profile page
module.exports.profile = function(req, res){
    return res.render('user_profile');
>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4
}

module.exports.createUser = function(req, res){
    if(req.body.password != req.body.confirm){
        console.log("Passwords did not match");
        res.redirect('back');
        return;
    };
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('User Already exists');
            return;
        };
        if(!user){
            User.create(req.body, function(err){
                if(err){
                    throw err;
                }
                console.log("User Created Sucessfully!");
                return res.redirect('/sign-in');
            });
        }
        else{
            console.log("User already Exists");
            return res.redirect('/sign-in');
        }
    });
};
// Creating the sign in session

module.exports.createSession = function(req, res){
<<<<<<< HEAD
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
=======
    return res.redirect('/user/profile');
>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4
};

module.exports.destroySession = function(req, res){
    req.logout(); // Logged out when we got the request to this route i.e. logout
<<<<<<< HEAD
    req.flash('success', 'You have Logged Out');
=======
>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4
    return res.redirect('/'); // After logging out we redirected to our homepage
};