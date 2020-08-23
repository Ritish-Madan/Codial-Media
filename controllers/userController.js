/*---------------------------------------------------------------------------------------------------------
Developer's Note ---> Do not change until you know what you are doing, changed might lead to serious security 
issues for users and might get at potential risks. 
-----------------------------------------------------------------------------------------------------------*/
// Importing user Schema
const User = require('../schema/userSchema')
const forgetPasswordSchema = require('../schema/password_reset');
const crypto = require('crypto');
const forgot = require('../mailers/forgot_password');
const { exception } = require('console');
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

// Forget Password
module.exports.forgetPage = function(req, res){
    res.render('forget-password.ejs')
}

module.exports.resetPassword = async function(req,res){
    let user = await User.findOne({email: req.body.email});
    console.log(req.body.email)
    if(user){
        let newForget = await forgetPasswordSchema.create({
            user: user.id,
            token: crypto.randomBytes(20).toString('hex'),
            isValid: true
        })
        let populatedForget = await forgetPasswordSchema.findById(newForget._id).populate('user');
        
        forgot.forgetmail(populatedForget)
        req.flash('success', 'Check your mailbox');
        return res.redirect('/');
    }else{
        req.flash('error','User Not Found!');
        return res.redirect('/user/forget-password');
    };
};

module.exports.newPassword = async function(req, res){
    let changeRequest = await forgetPasswordSchema.findOne({token: req.query.token});
    if(changeRequest.isValid){
        res.render('new_password',{
            token: changeRequest.token
        });
        return;
    }else{
        req.flash('error', 'Invalid Action');
        res.redirect('/');
        return;
    }
}

module.exports.updatePassword = async function(req, res){
    try{
        let changeRequest = await forgetPasswordSchema.findOne({token: req.body.token});

        if(req.body.password != req.body.confirm || (req.body.password).length < 1){
            req.flash('error', 'Password did not match');
            return res.redirect('/user/reset-password/?token=' + req.body.token);
        }else{
            let newPassword = await User.findByIdAndUpdate(changeRequest.user, {password: req.body.password});
            changeRequest.isValid = false;
            changeRequest.save();
            return res.redirect('/');
        }
    }catch(err){
        return console.log(err);

    }
}