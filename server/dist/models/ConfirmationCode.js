import { Schema, model } from 'mongoose';
const confirmationCodeSchema = new Schema({
    code: {
        type: Number,
        required: true,
    }
});
export default model('ConfirmationCode', confirmationCodeSchema);
