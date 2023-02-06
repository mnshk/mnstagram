import { Schema, Types, model } from 'mongoose'

export interface IBookmark {
    post: Types.ObjectId
}

export const bookmarkSchema = new Schema<IBookmark>({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    }
})