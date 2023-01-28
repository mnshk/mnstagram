console.clear()

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('./utils/database').connect()

const app = express()
const PORT = process.env.PORT || 9000

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors())

app.use((err, req, res, next) => {
    console.log(err.message)
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.status || 500).send({
        error: err.statusCode >= 500 && !err.message ? 'An unexpected error ocurred, please try again later.' : err.message,
    })
})

app.listen(PORT, () => { console.log(`listining ${PORT}`) })