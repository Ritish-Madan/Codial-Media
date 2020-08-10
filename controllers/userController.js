/*---------------------------------------------------------------------------------------------------------
Developer's Note ---> Do not change until you know what you are doing, changed might lead to serious security 
issues for users and might get at potential risks. 
-----------------------------------------------------------------------------------------------------------*/
// Importing user Schema
const User = require('../schema/userSchema')
// profile page of other users
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log('Error finding the users in friends');
            return res.redirect('/');
        }
        return res.render('user_profile',{
            user_pro: user
        });
    })
}

module.exports.update = async function(req, res){
    if(req.params.id == req.user.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
            if(err){
                return console.log('***Multer Error****');
            }
            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file){
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            req.flash('success', "Profile Updated")
            user.save();
            return res.redirect('back');
        })
        }catch(err){
            console.log('error occured!',err);
            return res.redirect('back');
        }
    }else{
        console.log('Not Authorized!!!');
        return res.redirect('back');
    }
};

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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout(); // Logged out when we got the request to this route i.e. logout
    req.flash('success', 'You have Logged Out');
    return res.redirect('/'); // After logging out we redirected to our homepage
}