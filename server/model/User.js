const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    riddlesSolved: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
