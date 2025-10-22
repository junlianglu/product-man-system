import { createSlice } from '@reduxjs/toolkit';
import { 
    fetchCartWithSummaryThunk, 
    addToCartThunk, 
    updateItemQuantityThunk, 
    applyDiscountCodeThunk,
    removeItemThunk,
} from './cartThunks';

const initialState = {
    items: [],
    summary: null,
    isCartOpen: false,
    status: 'idle',
    error: null,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        closeCart: (state) => {
            state.isCartOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartWithSummaryThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCartWithSummaryThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.cart.items;
                state.summary = action.payload.summary;
            })
            .addCase(fetchCartWithSummaryThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
        builder
            .addCase(addToCartThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addToCartThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.cart.items;
                state.summary = action.payload.summary;
            })
            .addCase(addToCartThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
        builder
            .addCase(updateItemQuantityThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateItemQuantityThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.cart.items;
                state.summary = action.payload.summary;
            })
            .addCase(updateItemQuantityThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
        builder
            .addCase(applyDiscountCodeThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(applyDiscountCodeThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.cart.items;
                state.summary = action.payload.summary;
            })
            .addCase(applyDiscountCodeThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
        builder
            .addCase(removeItemThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(removeItemThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.cart.items;
                state.summary = action.payload.summary;
            })
            .addCase(removeItemThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { toggleCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;