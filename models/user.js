const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        trim: true,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);

