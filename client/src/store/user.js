import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        loggedIn: (user, action) => {
            user.name = action.payload.name
            console.log('loggedIn')
        },
        loggedOut: (user, action) => {
            user.name = undefined
            console.log('loggedOut')
        },
    },
})

export const { loggedIn, loggedOut } = slice.actions
export default slice.reducer

export const getUserName = (state) => {
    return state?.user?.name
}