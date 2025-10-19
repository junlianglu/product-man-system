import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import productReducer from "../features/product/productSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
    }
});
