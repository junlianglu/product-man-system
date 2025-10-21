import React, {useState} from "react";
import {formatPrice} from "../../utils/formatPrice";
import {useNavigate} from "react-router-dom";

export default function ProductCard({
    product,
    isAdmin,
    isAuthenticated,
    onAddToCart,
    onUpdateQuantity,
}){
    const {name, price, imageURL, stock} = product;
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const handleDecrease = () => {
        if(quantity > 1){
            setQuantity(quantity-1);
            onUpdateQuantity(product._id, quantity-1);
        }
    };

    const handleIncrease = () => {
        if(quantity < stock){
            setQuantity(quantity+1);
            onUpdateQuantity(product._id, quantity+1);            
        }
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
                src={product.imageURL}
                alt={product.name}
                style={{}}
            />
            <h3>{name}</h3>
            <p>{formatPrice(price)}</p>

            <div style={{}}
            onClick={(e) => e.stopPropagation()}>
                {isAuthenticated &&
                (
                    <>
                        <button onClick={handleDecrease} disabled={quantity <=1}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrease} disabled={quantity >= stock}>+</button>
                    </>
                )}
                <button onClick={onAddToCart} disabled={!isAuthenticated}>Add</button>
                {isAdmin && <button onClick={handleEdit}>Edit</button>}
            </div>
        </div>
    );
}