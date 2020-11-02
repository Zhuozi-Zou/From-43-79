/* Comment mongoose model */
const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        required: true,
        type: String
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    postTime: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema, 'Comments');
module.exports = { Comment };