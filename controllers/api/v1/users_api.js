const User = require('../../../schema/userSchema');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){

    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid Username or Password"
            });
        }else return res.status(200).json({
            message: 'Success',
            data: {
                token: jwt.sign(user.toJSON(), 'codial', {expiresIn: 100000})
            }
        })
    }catch(err){
        console.log('****error occured', err);
        return res.status(500).json({
            message: 'Unauthorized'
        })
    }
};

// TODO Create a route for this controller in api/v1/< New File.js >