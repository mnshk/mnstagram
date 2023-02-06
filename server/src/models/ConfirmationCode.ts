import { Schema, model, Types } from 'mongoose'

interface IConfirmationCode {
    token: string,
    code: number,
}

const confirmationCodeSchema = new Schema<IConfirmationCode>({
    code: {
        type: Number,
        required: true,
    }
})

export default model<IConfirmationCode>('ConfirmationCode', confirmationCodeSchema)
