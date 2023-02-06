import { Schema, Types, model } from 'mongoose'
import bcrypt from 'bcrypt'

import RequestError from '../utils/requestError.js'
import { validateEmail } from '../utils/validation.js'
import { IBookmark, bookmarkSchema } from './schema/Bookmark.js'
import { IFollower, followerSchema } from './schema/Follower.js'

interface IUser {
    email: string,
    fullName: string,
    username: string,
    password: string,
    avatar: String,
    bio: string,
    website: string,
    private: boolean,
    followers: IFollower[],
    following: Types.ObjectId[],
    bookmarks: IBookmark[]
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minlength: 3,
    },
    password: {
        type: String,
        minlength: 6,
    },
    avatar: String,
    bio: {
        type: String,
        maxlength: 130,
    },
    website: {
        type: String,
    },
    private: {
        type: Boolean,
        default: false,
    },
    bookmarks: [bookmarkSchema],
    followers: [followerSchema],
    following: [Schema.Types.ObjectId],
})

export default model('User', userSchema)

// userSchema.pre('save', function (next) {

//     const saltRounds = 10

//     if (this.modifiedPaths().includes('password')) {
//         bcrypt.genSalt(saltRounds, (err, salt) => {
//             if (err) return next(err)

//             bcrypt.hash(this.password, salt, (err, hash) => {
//                 if (err) return next(err)
//                 this.password = hash
//                 next()
//             })
//         })
//     }
//     else next()
// })

// userSchema.pre('save', async function (next) {
//     if (this.isNew) {
//         try {
//             const document = await User.findOne({ username: this.username })
//             if (document) {
//                 return next(new RequestError(400, {
//                     errors: {
//                         username: 'This username isn\'t available. Please try another.',
//                     }
//                 }))
//             }
//             await mongoose.model('Followers').create({ user: this._id })
//             await mongoose.model('Following').create({ user: this._id })
//         } catch (err) {
//             return next(err)
//         }
//     }
// })