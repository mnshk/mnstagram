import { Schema, Types, model } from 'mongoose'

export interface IFollower {
    follower: Types.ObjectId,
    accepted: boolean,
}

export const followerSchema = new Schema<IFollower>({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    accepted: {
        type: Boolean,
        required: true,
    }
})