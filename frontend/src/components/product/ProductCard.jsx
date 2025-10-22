import React, {useState, useEffect} from "react";
import {formatPrice} from "../../utils/formatPrice";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import {selectCartItems} from "../../features/cart/cartSelectors";

export default function ProductCard({
    product,
    isAdmin,
    isAuthenticated,
    onAddToCart,
    onUpdateQuantity,
}){
    const {name, price, imageURL, stock} = product;
    const navigate = useNavigate();

    const cartItems = useSelector(selectCartItems);
    const existingCartItem = cartItems.find((item) => item.product._id === product._id);
    const [quantity, setQuantity] = useState(existingCartItem ? existingCartItem.quantity : 0);

    useEffect(() => {
        if(existingCartItem){
            setQuantity(existingCartItem.quantity);
        }else{
            setQuantity(0);
        }
    }, [existingCartItem]);

    const handleDecrease = () => {
        if(quantity > 0){
            const newQuantity = quantity-1;
            setQuantity(newQuantity);
            onUpdateQuantity(product._id, newQuantity);
        }
    };

    const handleIncrease = () => {
        if(quantity < stock){
            const newQuantity = quantity+1;
            setQuantity(newQuantity);
            onUpdateQuantity(product._id, newQuantity);            
        }
    };   

    const handleAdd = () => {
        const newQuantity = quantity > 0 ? quantity +1 :1;
        setQuantity(newQuantity);
        onAddToCart(product._id);
    };

    const handleEdit = () => {
        navigate(`/edit-product/${product._id}`);
    };

    const handleCardClick = (e) => {
        if(e.target.tagName.toLowerCase() === "button") return;
        navigate(`/product/${product._id}`);

    };

    return (
        <div
            className = "product-card"
            onClick={handleCardClick}
            style={{
                cursor: "pointer",
            }}
        >
            <img
                src={imageURL}
                alt={name}
                style={{objectFit: "cover",}}
            />
            <h3>{name}</h3>
            <p>{formatPrice(price)}</p>

            <div style={{}}
            onClick={(e) => e.stopPropagation()}>
                {isAuthenticated && quantity >0 && 
                (
                    <>
                        <button onClick={handleDecrease}>-</button>
                        <span style={{}}>{quantity}</span>
                        <button onClick={handleIncrease} disabled={quantity >= stock}>+</button>
                    </>
                )}
                {isAuthenticated && quantity === 0 && (
                <button onClick={handleAdd}>Add</button>
                )}
                {isAdmin && <button onClick={handleEdit}>Edit</button>}
            </div>
        </div>
    );
}