import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/product/productThunks";
import ProductForm from "../../components/product/ProductForm";
import { useNavigate} from "react-router-dom";
import styles from "./styles/AddProduct.module.css";


export default function AddProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        try{
            await dispatch(addProduct(data)).unwrap();
            alert("Product added successfully!");
            navigate("/");  
        } catch{
            alert(`Failed to add product: ${err}`);
        }    
    };

    return (
        <div className={styles.pageWrapper}>
            <h1 className={styles.pageTitle}>Add product</h1>
            <div className={styles.formContainer}>
                <ProductForm onSubmit={handleSubmit}/>
            </div>
        </div>
    );
}