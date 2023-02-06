"use strict";
const mongoose = require('mongoose');
const FollowersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    followers: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        }
    ]
});
module.exports = mongoose.model('Followers', FollowersSchema);
