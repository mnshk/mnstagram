import mongoose from "mongoose"
import RequestError from "./requestError.js"

mongoose.set('strictQuery', false)

export default async function dbConnect() {

    const dbUser = process.env.DATABASE_USERNAME
    const dbPass = process.env.DATABASE_PASSWORD
    const dbStr = process.env.DATABASE_STRING

    try {
        if (dbUser && dbPass && dbStr) {
            const uri = `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPass)}@${dbStr}`
            await mongoose.connect(uri)
            console.log('connected to database.')
        }
    } catch (err) {
        throw new RequestError()
    }
}
