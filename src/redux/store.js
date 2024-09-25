// file: redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slice/ProductSlide';
import userReducer from './slice/userSlide'

export const store = configureStore({
    reducer: {
        products: productReducer,  // Sử dụng reducer được export default từ counterSlide
        users: userReducer
    },
});
