import { Schema, Types, model } from 'mongoose'

interface ICommentReply {
    author: Types.ObjectId,
    comment: string,
    createdAt: string,
}

export interface IComment {
    author: Types.ObjectId,
    comment: string,
    createdAt: string,
    replies: ICommentReply[],
}

const commentReplySchema = new Schema<ICommentReply>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true })


export const commentSchema = new Schema<IComment>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    replies: [commentReplySchema],
}, { timestamps: true })
