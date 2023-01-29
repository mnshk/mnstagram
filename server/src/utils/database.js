const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

module.exports.connect = async () => {
    try {
        const uri = `mongodb+srv://${encodeURIComponent(process.env.DATABASE_USERNAME)}:${encodeURIComponent(process.env.DATABASE_PASSWORD)}@${process.env.DATABASE_STRING}`
        await mongoose.connect(uri)
        console.log('connected to database.')
    } catch (err) {
        throw new Error(err)
    }
}
