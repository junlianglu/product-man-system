import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editProduct,fetchProductById } from "../../features/product/productThunks";
import {selectProductStatus, selectSelectedProduct} from "../../features/product/productSelectors";
import ProductForm from "../../components/product/ProductForm";


export default function EditProduct(){
    const dispatch = useDispatch();
    const {productId} = useParams();
    const product = useSelector(selectSelectedProduct);
    const status = useSelector(selectProductStatus);

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    const handleSubmit = (data) => {
        if(!product) return;
        dispatch(editProduct({productId: product._id, productData: data}));       
    };

    if (status === "loading") return <p>Loading product...</p>;
    if (!product) return <p>Product not found.</p>;    

    return (
        <div>
            <h2>Edit product</h2>
            <ProductForm onSubmit={handleSubmit} initialData={product}/>            
        </div>
    );
}