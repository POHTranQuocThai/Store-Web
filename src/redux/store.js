import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counterSlide'
export const store = configureStore({
    reducer: {
        counter: counterReducer
    },
})

