import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: (counter) => {
            counter.value++;
        },
        decrement: (counter) => {
            counter.value--;
        },
    }
})

export const { increment, decrement } = slice.actions
export default slice.reducer

export const getValue = (state) => state.counter.value