import { Schema, Types, model } from 'mongoose'
import Comment, { IComment } from './schema/Comment.js'

interface IPost {
    author: Types.ObjectId,
    mediaUrl: string,
    caption: string,
    createdAt: string,
    likes: Types.ObjectId[],
    comments: IComment[],
}

const postSchema = new Schema<IPost>({
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
}, { timestamps: true })

export default model<IPost>('Post', postSchema)