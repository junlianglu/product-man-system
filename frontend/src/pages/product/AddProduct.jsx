import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/product/productThunks";
import ProductForm from "../../components/product/ProductForm";
import { useNavigate} from "react-router-dom";


export default function AddProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (data) => {
        try{
            await dispatch(addProduct(data)).unwrap;
            alert("Product added successfully!");
            navigate("/");  
        } catch{
            alert(`Failed to add product: ${err}`);
        }    
    };

    return (
        <div>
            <h2>Add product</h2>
            <ProductForm onSubmit={handleSubmit}/>
        </div>
    );
}