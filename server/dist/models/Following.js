"use strict";
const mongoose = require('mongoose');
const FollowingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    following: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        }
    ]
});
module.exports = mongoose.model('Following', FollowingSchema);
