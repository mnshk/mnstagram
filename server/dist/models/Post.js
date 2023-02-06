import { Schema, model } from 'mongoose';
import Comment from './schema/Comment.js';
const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    mediaUrl: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        default: '',
    },
    likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
    comments: [Comment],
}, { timestamps: true });
export default model('Post', postSchema);
