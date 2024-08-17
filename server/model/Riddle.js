
const mongoose = require('mongoose');
const { Schema } = mongoose;

const riddleSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    hashType: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    solved: {
        type: Boolean,
        default: false
    },
    solvedCount : {
        type : Number,
        default : 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Riddle', riddleSchema);
