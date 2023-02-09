import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validateEmail, validateFullName, validateUsername, validatePassword } from '../utils/validation.js'
import { sendConfirmationEmail } from '../utils/controllerUtils.js'
import { RequestHandler } from 'express'
import RequestError from '../utils/requestError.js'
import User from '../models/User.js'
import ConfirmationCode from '../models/ConfirmationCode.js'

export const signup: RequestHandler = async (req, res, next) => {

    const { email, fullName, username, password, confirmationCode, confirmationToken } = req.body;

    let errors = {
        email: validateEmail(email),
        fullName: validateFullName(fullName),
        username: validateUsername(username),
        password: validatePassword(password),
    }

    if (errors.email || errors.fullName || errors.username || errors.password) {
        return res.status(400).send({ errors })
    }

    if (confirmationToken) {

        const decodedToken = <jwt.JwtPayload>jwt.verify(confirmationToken, process.env.JWT_SECRET as string)

        if (!decodedToken) {
            return res.status(400).send({ errors: { message: "Invalid or expired code. Try again." } })
        }

        const result = await ConfirmationCode.findOne({ _id: decodedToken.id })

        if (!result || result.code != confirmationCode) {
            return res.status(400).send({ errors: { message: "Invalid or expired code. Try again." } })
        }
        await ConfirmationCode.deleteOne({ _id: decodedToken.id })
    }

    if (await User.findOne({ email })) {
        return res.status(400).send({ errors: { email: "Email address is already in use." } })
    }

    if (await User.findOne({ username })) {
        return res.status(400).send({ errors: { username: "This username isn't available. Please try another." } })
    }

    if (!confirmationToken) {
        let code = Math.floor(100000 + Math.random() * 900000)
        // let code = 111111
        let codeDoc = new ConfirmationCode({ code })
        let result = await codeDoc.save()
        await sendConfirmationEmail(username, email, code)
        let token = jwt.sign({ id: result._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' })
        return res.send({ data: { token, email } })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, fullName, username, password: hashedPassword })
    await user.save()

    return res.status(201).send({
        data: {
            user: {
                username,
                fullName,
                email,
            },
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)
        }
    })
}

export const passwordReset: RequestHandler = async (req, res, next) => {

    const { username, password, confirmationCode, confirmationToken } = req.body;

    let errors = { username: username ? false : 'This field is required.' }
    if (errors.username) return res.status(400).send({ errors })

    // If there's a token
    if (confirmationToken) {

        if (!password) return res.status(400).send({ errors: { password: 'This field is required' } })
        // Decode token
        const decodedToken = <jwt.JwtPayload>jwt.verify(confirmationToken, process.env.JWT_SECRET as string)
        if (!decodedToken) return res.status(400).send({ errors: { message: "Invalid or expired code. Try again." } })

        // Find and match code
        const result = await ConfirmationCode.findOne({ _id: decodedToken.id })
        if (!result || result.code != confirmationCode) return res.status(400).send({ errors: { message: "Invalid or expired code. Try again." } })

        await ConfirmationCode.deleteOne({ _id: decodedToken.id })
    }

    let user = await User.findOne({
        $or: [
            { username },
            { email: username },
        ]
    })

    // Check if the user exists, then send confirmation code over email
    if (!confirmationToken) {
        if (!user) return res.status(400).send({ errors: { username: "No account found. Try again." } })

        let { email, username } = user
        let code = Math.floor(100000 + Math.random() * 900000)
        // let code = 111111
        let codeDoc = new ConfirmationCode({ code })
        let result = await codeDoc.save()
        await sendConfirmationEmail(username, email, code)
        let token = jwt.sign({ id: result._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' })
        return res.send({ data: { token, email } })
    }

    // If there was a confirmation token then it means the request was for resetting password
    if (validatePassword(password)) {
        return res.status(400).send({ errors: { password: "Enter a valid password." } })
    }

    if (!user) return res.status(400).send({ errors: { username: "No account found. Try again." } })
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    await user.save()
    return res.send({ data: true })
}

export const login: RequestHandler = async (req, res, next) => {

    const { authorization } = req.headers
    const { username, password } = req.body
    let user = null

    if (authorization) {
        try {
            const decoded = <jwt.JwtPayload>jwt.verify(authorization, process.env.JWT_SECRET as string)
            user = await User.findOne({ _id: decoded.id })
        } catch (err) {
            return res.status(500).send({ errors: { message: 'Something went wrong. Please try again.' } })
        }
    } else {
        if (!username || !password) {
            return res.status(400).send({ errors: { message: 'Invalid credentials.' } })
        }
        try {
            user = await User.findOne({ username: username })
            if (!user || !user.password) {
                return res.status(401).send({ errors: { message: 'Either your username or password was incorrect. Please double-check and try again. [u]' } })
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return next(err)

                if (!result) {
                    return res.status(401).send({ errors: { message: 'Either your username or password was incorrect. Please double-check and try again. [p]' } })
                }
            })
        } catch (err) {
            next(err)
        }
    }

    if (user) {
        res.send({
            data: {
                user: {
                    email: user?.email,
                    username: user?.username,
                    avatar: user?.avatar,
                },
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)
            }
        })
    }
}