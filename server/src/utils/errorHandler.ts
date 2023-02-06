import { ErrorRequestHandler } from "express"

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log('\n\n\n\n[ERROR START]\n ', err, '\n[ERROR END]\n\n\n\n')

    if (err.statusCode && err.payload) {
        return res.status(err.statusCode).send(err.payload)
    }
    res.status(500).send({
        errors: {
            message: 'An unexpected error ocurred, please try again later. [S]'
        }
    })
}

export default errorHandler