import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    summary: {
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0
    },
    status: 'idle',
    error: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        
    }
});

export default cartSlice.reducer;