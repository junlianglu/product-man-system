import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAllProducts, getProductById,deleteProductById,
    updateProductById,createProduct,
} from "../../api/products";

export const fetchProducts = createAsyncThunk("product/fetchAll", 
    async ({page = 1, limit = 10} = {}, thunkAPI) => {
        try{
            const data = await getAllProducts({page, limit});
            return data;
        }catch (err){
            return thunkAPI.rejectWithValue(err.message);
        }
});

export const fetchProductById = createAsyncThunk("product/fetchById", async (productId) => {
    return await (getProductById(productId));
});

export const addProduct = createAsyncThunk("product/add", async ({productData, token}) => {
    return await (createProduct(productData, token));
});

export const editProduct = createAsyncThunk("product/edit", async ({productId, productData, token}) => {
    return await (updateProductById(productId, productData, token));
});

export const removeProduct = createAsyncThunk("product/remove", async ({productId, token}) => {
    return await (deleteProductById(productId, token));
});