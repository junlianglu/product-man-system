import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/product/productThunks";
import ProductForm from "../../components/product/ProductForm";
import {selectAuthToken} from "../../features/auth/authSelectors";

export default function AddProduct() {
    const dispatch = useDispatch();
    const token = useSelector(selectAuthToken);
    const handleSubmit = (data) => {
        dispatch(addProduct({productData: data, token}));
    };

    return (
        <div>
            <h2>Add product</h2>
            <ProductForm onSubmit={handleSubmit}/>
        </div>
    );
}