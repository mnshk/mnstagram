import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'slice2',
    initialState: [],
    reducers: {
        test: (state, action) => {
            console.log('second reducer')
        },
    }
})

export const { test } = slice.actions
export default slice.reducer