const mongoose = require('mongoose');

const resetPassword = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token:{
        type: String,
        unique: true,
        required: true
    },
    isValid:{
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

const reset = mongoose.model("resetPassword", resetPassword);
module.exports = reset;