// file: redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productReducer from './slice/ProductSlide';
import userReducer from './slice/userSlide'
import orderReducer from './slice/orderSlide'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['products', 'user']
}
const rootReducer = combineReducers({
    products: productReducer,  // Sử dụng reducer được export default từ counterSlide
    users: userReducer,
    order: orderReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store)