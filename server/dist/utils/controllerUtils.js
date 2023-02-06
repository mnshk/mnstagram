var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTransport, } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import RequestError from './requestError.js';
export function sendEmail(to, subject, html) {
    return __awaiter(this, void 0, void 0, function* () {
        const host = process.env.SMTP_HOST;
        const port = process.env.SMTP_PORT;
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        if (host && port && user && pass) {
            const transporter = createTransport({
                host,
                port,
                secure: false,
                auth: {
                    user,
                    pass,
                },
            });
            yield transporter.sendMail({
                from: '"Mnstagram" <web.munish.ml@gmail.com>',
                to,
                subject,
                html,
            });
        }
    });
}
export function sendConfirmationEmail(username, email, confirmationCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const source = fs.readFileSync('src/templates/confirmationEmail.html', 'utf8');
            const template = handlebars.compile(source);
            const html = template({
                username,
                confirmationCode,
                url: process.env.CLIENT_HOME_URL,
            });
            yield sendEmail(email, 'Activate your Mnstagram account', html);
        }
        catch (err) {
            console.log(err);
            throw new RequestError(500, { errors: { message: 'Something went wrong. Unable to send confirmation email. Please try again later.' } });
        }
    });
}
