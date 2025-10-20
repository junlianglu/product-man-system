import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/product/productThunks";
import ProductForm from "../../components/product/ProductForm";

export default function AddProduct() {
    const dispatch = useDispatch();
    const handleSubmit = (data) => {
        const token = localStorage.getItem("token");
        dispatch(addProduct({productData: data, token}));
    };

    return (
        <div>
            <h2>Add product</h2>
            <ProductForm onSubmit={handleSubmit}/>
        </div>
    );
}