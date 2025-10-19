import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts, fetchProductById, addProduct, editProduct,
    removeProduct,
} from "./productThunks";

const initialState = {
    items: [],
    selectedProduct: null,
    status: "idle",
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearSelectedProduct(state) {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        //fetchProducts
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state,action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        //fetchProductById
        .addCase(fetchProductById.pending, (state) => {
            state.status = "loading";
            state.error = null;
            state.selectedProduct = null;
        })
        .addCase(fetchProductById.pending, (state, action) => {
            state.status = "succeeded";
            state.selectedProduct = action.payload;
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            state.selectedProduct = null;
        })
        //addproduct
        .addCase(addProduct.pending, (state) => {
            state.status = "loading";
            state.error = null;           
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items.push(action.payload);         
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;           
        })
        //editproduct
        .addCase(editProduct.pending, (state) => {
            state.status = "loading";
            state.error = null;           
        })
        .addCase(editProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            const updated = action.payload;
            const index = state.items.findIndex((p) => p._id === updated._id);
            if(index >= 0){
                state.items[index] = updated;   
            }     
        })
        .addCase(editProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;         
        })
        //removeproduct
        .addCase(removeProduct.pending, (state) => {
            state.status = "loading";
            state.error = null;           
        })
        .addCase(removeProduct.fulfilled, (state, action) => {
            state.status = "succeeded";
            const deleted = action.payload;
            state.items = state.items.filter((p) => p._id !== deleted._id);       
        })
        .addCase(removeProduct.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;          
        });
    },
});

export const {clearSelectedProduct} =  productSlice.actions;
export default productSlice.reducer;
