import { configureStore } from '@reduxjs/toolkit'
import user from './user'
import second from './secondSlice'
import logger from './middleware/logger'
import counter from './counter'

const store = configureStore({
    reducer: {
        user,
        second,
        counter
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger('console')]
})

export default store;