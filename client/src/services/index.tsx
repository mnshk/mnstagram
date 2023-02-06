import axios, { AxiosError } from 'axios'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export function handleRequestError(err: AxiosError) {
    if (err.response) {
        return err.response.data
    }
    return ({
        errors: { message: 'Unable to reach the server. Please make sure you\'re connected to the internet.' }
    })
}


export const testRequest = async () => {
    try {
        const res = await api.get('/')
        return res.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return handleRequestError(err)
        }
    }
}
