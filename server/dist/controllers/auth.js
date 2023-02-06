var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import ConfirmationCode from '../models/ConfirmationCode.js';
import { validateEmail, validateFullName, validateUsername, validatePassword } from '../utils/validation.js';
import { sendConfirmationEmail } from '../utils/controllerUtils.js';
export const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fullName, username, password, confirmationCode, confirmationToken } = req.body;
    let errors = {
        email: validateEmail(email),
        fullName: validateFullName(fullName),
        username: validateUsername(username),
        password: validatePassword(password),
    };
    if (errors.email || errors.fullName || errors.username || errors.password) {
        return res.status(400).send({ errors });
    }
    if (confirmationToken) {
        const decodedToken = jwt.verify(confirmationToken, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(400).send({ errors: { message: "Invalid or expired code. Try again." } });
        }
        const result = yield ConfirmationCode.findOne({ _id: decodedToken.id });
        if (!result || result.code != confirmationCode) {
            return res.status(400).send({ errors: { message: "Invalid or expired code. Try again." } });
        }
        yield ConfirmationCode.deleteOne({ _id: decodedToken.id });
    }
    if (yield User.findOne({ email })) {
        return res.status(400).send({ errors: { email: "Email address is already in use." } });
    }
    if (yield User.findOne({ username })) {
        return res.status(400).send({ errors: { username: "This username isn't available. Please try another." } });
    }
    if (!confirmationToken) {
        let code = Math.floor(100000 + Math.random() * 900000);
        // let code = 111111
        let codeDoc = new ConfirmationCode({ code });
        let result = yield codeDoc.save();
        yield sendConfirmationEmail(username, email, code);
        let token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.send({ data: { token } });
    }
    const hashedPassword = yield bcrypt.hash(password, 10);
    const user = new User({ email, fullName, username, password: hashedPassword });
    yield user.save();
    return res.status(201).send({
        data: {
            user: {
                username,
                fullName,
                email,
            },
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        }
    });
});
export const passwordReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, confirmationCode, confirmationToken } = req.body;
    let errors = {
        username: username ? false : 'This field is required.',
    };
    if (errors.username) {
        return res.status(400).send({ errors });
    }
    if (confirmationToken) {
        const decodedToken = jwt.verify(confirmationToken, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(400).send({ errors: { message: "Invalid or expired code. Try again. [decode]" } });
        }
        const result = yield ConfirmationCode.findOne({ _id: decodedToken.id });
        if (!result || result.code != confirmationCode) {
            return res.status(400).send({ errors: { message: "Invalid or expired code. Try again. [match]" } });
        }
        if (password)
            yield ConfirmationCode.deleteOne({ _id: decodedToken.id });
        else
            return res.send({ data: true });
    }
    let user = yield User.findOne({
        $or: [
            { username },
            { email: username },
        ]
    });
    if (!confirmationToken) {
        if (!user) {
            return res.status(400).send({ errors: { username: "No account found. Try again." } });
        }
        let email = user.email;
        let usernameFetched = user.username;
        // let code = Math.floor(100000 + Math.random() * 900000)
        let code = 111111;
        let codeDoc = new ConfirmationCode({ code });
        let result = yield codeDoc.save();
        // await sendConfirmationEmail(usernameFetched, email, code)
        let token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.send({ data: { token, email } });
    }
    if (validatePassword(password)) {
        return res.status(400).send({ errors: { password: "Enter a valid password." } });
    }
    const hashedPassword = yield bcrypt.hash(password, 10);
    user.password = hashedPassword;
    yield (user === null || user === void 0 ? void 0 : user.save());
    return res.send({ data: true });
});
// module.exports.requireAuth = async (req, res, next) => {
//     const { authorization } = req.headers
//     if (!authorization) {
//         return res.status(401).send({ errors: { message: 'Not authorized.' } })
//     }
//     try {
//         const user = await jwt.verify(authorization, process.env.JWT_SECRET)
//         res.locals.user = user
//         return next()
//     } catch (err) {
//         return res.status(401).send({ errors: { message: err.message } })
//     }
// }
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const { username, password } = req.body;
    let user = null;
    if (authorization) {
        try {
            const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
            user = yield User.findOne({ _id: decoded.id });
        }
        catch (err) {
            return res.status(401).send({ errors: { message: 'Something went wrong. Please try again.' } });
        }
    }
    else {
        if (!username || !password) {
            return res.status(401).send({ errors: { message: 'Invalid credentials.' } });
        }
        try {
            user = yield User.findOne({ username: username });
            if (!user || !user.password) {
                return res.status(401).send({ errors: { message: 'Either your username or password was incorrect. Please double-check and try again. [u]' } });
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err)
                    return next(err);
                if (!result) {
                    return res.status(401).send({ errors: { message: 'Either your username or password was incorrect. Please double-check and try again. [p]' } });
                }
            });
        }
        catch (err) {
            next(err);
        }
    }
    console.log('USER', user);
    setTimeout(() => {
        res.status(500).send({ errors: { message: 'An unexpected error ocurred, please try again later. [S]' } });
    }, 3000);
    // setTimeout(() => {
    // }, 3000)
    // res.send({
    //     data: {
    //         user: {
    //             email: user?.email,
    //             username: user?.username,
    //             avatar: user?.avatar,
    //         },
    //         token: jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)
    //     }
    // })
});
// module.exports.verifyUser = async (req, res, next) => {
//     const { token } = req.body
//     if (!token) return res.status(400).send({ errors: { message: 'No token.' } })
//     try {
//         const confirmationToken = await ConfirmationToken.findOne({ token })
//         if (!confirmationToken) return res.status(404).send({ errors: { message: 'Invalid or expired confirmation link.' } })
//         await User.updateOne({ _id: confirmationToken.user }, { confirmed: true })
//         await ConfirmationToken.deleteOne({ token })
//         return res.send({ data: { message: true } })
//     } catch (err) {
//         next(err)
//     }
// }
