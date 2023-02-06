import { Schema } from 'mongoose';
export const bookmarkSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    }
});
