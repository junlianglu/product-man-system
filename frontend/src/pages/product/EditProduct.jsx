import React from "react";
import { useDispatch } from "react-redux";
import { editProduct } from "../../features/product/productThunks";
import ProductForm from "../../components/product/ProductForm";

export default function EditProduct({product}){
    const dispatch = useDispatch();

    const handleSubmit = (data) => {
        const token = localStorage.getItem("token");
        dispatch(editProduct({productId: product._id, productData: data, token}));       
    };

    return (
        <div>
            <h2>Edit product</h2>
            <ProductForm onSubmit={handleSubmit} initialData={product}/>            
        </div>
    );
}