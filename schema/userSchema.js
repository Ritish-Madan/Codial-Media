const mongoose = require('mongoose');
// Importing multur
const multer = require('multer');
const path = require('path')
const avatarPath = '/uploads/users/avatars/' ;
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
  },{
      timestamps: true
  });

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', avatarPath))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

  UserSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
  UserSchema.statics.avatarPath = avatarPath;

  const User = mongoose.model('User', UserSchema);
  module.exports = User;
