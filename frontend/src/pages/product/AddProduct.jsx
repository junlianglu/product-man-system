import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/product/productThunks";
import ProductForm from "../../components/product/ProductForm";


export default function AddProduct() {
    const dispatch = useDispatch();
    const handleSubmit = (data) => {
        dispatch(addProduct(data));
    };

    return (
        <div>
            <h2>Add product</h2>
            <ProductForm onSubmit={handleSubmit}/>
        </div>
    );
}