import { createTransport, } from 'nodemailer'
import fs from 'fs'
import handlebars from 'handlebars'
import RequestError from './requestError.js'


export async function sendEmail(to: string, subject: string, html: string) {

    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (host && port && user && pass) {
        const transporter = createTransport({
            host,
            port,
            secure: false,
            auth: {
                user,
                pass,
            },
        })
        await transporter.sendMail({
            from: '"Mnstagram" <web.munish.ml@gmail.com>',
            to,
            subject,
            html,
        })
    }
}

export async function sendConfirmationEmail(username: string, email: string, confirmationCode: number) {
    try {
        const source = fs.readFileSync(
            'src/templates/confirmationEmail.html',
            'utf8'
        )
        const template = handlebars.compile(source)
        const html = template({
            username,
            confirmationCode,
            url: process.env.CLIENT_HOME_URL,
        })
        await sendEmail(email, 'Activate your Mnstagram account', html)
    } catch (err) {
        console.log(err)
        throw new RequestError(500, { errors: { message: 'Something went wrong. Unable to send confirmation email. Please try again later.' } });
    }
}