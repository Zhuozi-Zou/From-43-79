/* Post mongoose model */
const mongoose = require('mongoose');
require('./comment');

const PostSchema = mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        required: true,
        type: String,
        default: 'active'
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    },
    startDate: Date,
    endDate: Date,
    region: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    },
    theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    },
    briefInfo: String,
    details: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    postTime: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

const Post = mongoose.model('Post', PostSchema, 'Posts');
module.exports = { Post };