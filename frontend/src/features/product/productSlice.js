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

        })


    },
});
