import { Schema, model } from 'mongoose';
const confirmationCodeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    code: {
        type: Number,
        required: true,
    }
});
export default model('ConfirmationCode', confirmationCodeSchema);
