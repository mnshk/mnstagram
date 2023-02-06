import { Schema } from 'mongoose';
export const followerSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    accepted: {
        type: Boolean,
        required: true,
    }
});
