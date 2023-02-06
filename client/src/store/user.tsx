import { createSlice } from "@reduxjs/toolkit"
import { login } from '../services/auth'
import Router from 'next/router'
import store from '.'

type UserState = {
    data: unknown,
    token: string | null
}

const initialState: UserState = {
    data: undefined,
    token: null
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        hydrateUserSlice: (user) => {
            user.token = localStorage.getItem('token')
            console.log('[USER SLICE] Hydrated.')
            if (user.token) {
                loginState(user.token)
            }
        },
        loggedIn: (user, action) => {
            user.token = action.payload.token
            user.data = action.payload.user
            if (user.token) {
                localStorage.setItem('token', user.token)
            }
            console.log('[USER SLICE] loggedIn')
            Router.push('/')
        },
        loggedOut: (user) => {
            user.data = undefined
            user.token = null
            localStorage.removeItem('token')
            console.log('[USER SLICE] loggedOut')
            Router.push('/account/login')
        },
    },
})

export const { loggedIn, loggedOut, hydrateUserSlice } = slice.actions
export default slice.reducer

export const getCurrentUserToken = (state: ReturnType<typeof store.getState>) => {
    return state.user.token
}

type UserData = {
    _id: string,
    username: string,
    avatar: string,
    fullName: string,
}

export const getCurrentUserData = (state: ReturnType<typeof store.getState>) => {
    return state.user.data
}

async function loginState(token: string) {

    const result = await login(undefined, token)

    if (result.errors) {
        return store.dispatch(loggedOut())
    }

    if (result.data) {
        return store.dispatch(loggedIn(result.data))
    }
}