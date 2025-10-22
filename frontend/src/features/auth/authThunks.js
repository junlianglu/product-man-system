import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, signupUser, resetPassword } from '../../api/auth';

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await loginUser({ email, password });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const signupThunk = createAsyncThunk(
    'auth/signup',
    async ({ email, password, isAdmin }, thunkAPI) => {
        try {
            const data = await signupUser({ email, password, isAdmin });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const resetPasswordThunk = createAsyncThunk(
    'auth/reset-password',
    async ({ email }, thunkAPI) => {
        try {
            const data = await resetPassword({ email });
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);