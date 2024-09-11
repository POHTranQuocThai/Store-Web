// file: redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlide';
import userReducer from './slice/userSlide'

export const store = configureStore({
    reducer: {
        counter: counterReducer,  // Sử dụng reducer được export default từ counterSlide
        users: userReducer
    },
});
