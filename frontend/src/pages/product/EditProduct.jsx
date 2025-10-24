import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editProduct,fetchProductById } from "../../features/product/productThunks";
import {selectProductStatus, selectSelectedProduct} from "../../features/product/productSelectors";
import ProductForm from "../../components/product/ProductForm";
import { useNavigate} from "react-router-dom";
import styles from "./styles/EditProduct.module.css";


export default function EditProduct(){
    const dispatch = useDispatch();
    const {productId} = useParams();
    const product = useSelector(selectSelectedProduct);
    const status = useSelector(selectProductStatus);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, [dispatch, productId]);

    const handleSubmit = async (data) => {
        if(!product) return;
        try{
            await dispatch(editProduct({productId: product._id, productData: data})).unwrap();
            navigate("/");  
        }catch(err){
            alert(`Failed to update product: ${err}`);
        }       
    };

    if (status === "loading") return <p>Loading product...</p>;
    if (!product) return <p>Product not found.</p>;    

    return (
        <div className={styles.pageWrapper}>
            <h1 className={styles.pageTitle}>Edit Product</h1>
            <div className={styles.formWrapper}>
                <ProductForm onSubmit={handleSubmit} initialData={product}/>            
            </div>
        </div>
    );
}