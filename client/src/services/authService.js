import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.1.20:9000',
})

export const Login = async ({ username, password }) => {
    try {
        const res = await api.get('/auth/login', {
            username,
            password,
        });
        return res.data
    }
    catch (err) {
        return err
    }
}

export const Signup = async ({ email, fullName, username, password }) => {
    try {
        const res = await api.get('/auth/signup', {
            email,
            fullName,
            username,
            password,
        });
        return res.data
    }
    catch (err) {
        return err
    }
}
export const ResetPassword = async ({ usernameOrEmail }) => {
    try {
        const res = await api.get('/auth/passwordrReset', {
            usernameOrEmail,
        });
        return res.data;
    }
    catch (err) {
        return err
    }
}