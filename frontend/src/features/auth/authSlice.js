import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, signupThunk, resetPasswordThunk } from './authThunks.js';
const savedUser = localStorage.getItem('user');
const savedToken = localStorage.getItem('token');

const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken ?? null,
    status: 'idle',
    error: null,
    successMessage: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
        builder
            .addCase(signupThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(signupThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(signupThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
        builder
            .addCase(resetPasswordThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.successMessage = null;
            })
            .addCase(resetPasswordThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.successMessage = action.payload.message;
            })
            .addCase(resetPasswordThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.successMessage = null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;