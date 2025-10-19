import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    fetchCartWithSummary,
    addToCart, 
    updateItemQuantity, 
    applyDiscountCode
} from '../../api/cart';

export const fetchCartWithSummaryThunk = createAsyncThunk(
    'cart/fetch',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const data = await fetchCartWithSummary({ token });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    },
);

export const addToCartThunk = createAsyncThunk(
    'cart/addItem',
    async ({ productId, quantity }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const data = await addToCart({ token, productId, quantity });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    },
);

export const updateItemQuantityThunk = createAsyncThunk(
    'cart/updateItemQuantity',
    async ({ productId, quantity }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const data = await updateItemQuantity({ token, productId, quantity });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    },
);

export const applyDiscountCodeThunk = createAsyncThunk(
    'cart/applyDiscount',
    async ({ discountCode }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const data = await applyDiscountCode({ token, discountCode });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    },
);

export const removeItemThunk = createAsyncThunk(
    'cart/removeItem',
    async ({ productId }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const data = await updateItemQuantity({ token, productId, quantity: 0 });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    },
);