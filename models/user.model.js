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
    
})
