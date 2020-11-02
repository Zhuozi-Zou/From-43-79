/* Comment mongoose model */
const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
        name: {
            required: true,
            type: String
        },
        filter: {
            required: true,
            type: String
        },
        page: {
            required: true,
            type: String
        },
        status: {
            required: true,
            type: String,
            default: 'active'
        },
        addedBy: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    });

const Tag = mongoose.model('Tag', TagSchema, 'Tags');
module.exports = { Tag };