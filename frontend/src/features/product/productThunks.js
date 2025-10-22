import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAllProducts, getProductById,deleteProductById,
    updateProductById,createProduct,
} from "../../api/products";

export const fetchProducts = createAsyncThunk("products/fetchAll", 
    async ({page = 1, limit = 10}, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.token;
            const data = await getAllProducts(page, limit, token);
            return data;
        }catch (err){
            return thunkAPI.rejectWithValue(err.message);
        }
});

export const fetchProductById = createAsyncThunk("products/fetchById", 
    async (productId,thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.token;
            const data = await getProductById(productId, token);
            return data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.message);
        }
});

export const addProduct = createAsyncThunk("products/add", 
    async (productData, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.token;
            const data = await createProduct(productData, token);
            return data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.message);
        }
});

export const editProduct = createAsyncThunk("products/edit", 
    async ({productId, productData}, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.token;
            const data = await updateProductById(productId, productData,token);
            return data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.message);
        }
});

export const removeProduct = createAsyncThunk("products/remove", 
    async (productId, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.token;
            const data = await deleteProductById(productId, token);
            return data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.message);
        }
});