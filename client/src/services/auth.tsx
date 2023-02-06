import { api, handleRequestError } from '@/services'
import axios, { AxiosError } from 'axios'

// export async function sendConfirmationCode(
//     email: string
// ) {
//     try {
//         const res = await api.post('/auth/sendCode', { email })
//         return res.data
//     } catch (err) {
//         if (axios.isAxiosError(err)) {
//             return handleRequestError(err)
//         }
//     }
// }

export const signup = async (
    form: {
        email: string,
        fullName: string,
        username: string,
        password: string,
        confirmationCode?: string,
        confirmationToken?: string,
    }
) => {
    try {
        const res = await api.post('/auth/signup', { ...form })
        return res.data
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            return handleRequestError(err)
        }
    }
}


export const login = async (
    form: {
        username: string,
        password: string,
    } | undefined,
    token: string | undefined
) => {
    try {
        const res = await api('/auth/login', {
            method: 'POST',
            headers: { authorization: token },
            data: { ...form }
        })
        return res.data
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            return handleRequestError(err)
        }
    }
}


export const resetPassword = async (form: { username: string, confirmationToken?: string, confirmationCode?: string }) => {
    try {
        const res = await api.post('/auth/passwordReset', { ...form });
        return res.data
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            return handleRequestError(err)
        }
    }
}

// export const verifyUser = async ({ token }) => {
//     try {
//         const res = await api.post('/auth/verify', {
//             token,
//         })
//         return res.data
//     }
//     catch (err) {
//         if (axios.isAxiosError(err)) {
//             return handleRequestError(err)
//         }
//     }
// }