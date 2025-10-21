import React, {useState} from "react";
import {formatPrice} from "../../utils/formatPrice";

export default function ProductCard({
    product,
    isAdmin,
    isAuthenticated,
    onAddToCart,
    onUpdateQuantity,
}){
    const {name, price, imageURL, stock} = product;
    const [quantity, setQuantity] = useState(1);

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

    return (
        <div
            className = "product-card"
            style={{}}
        >
            <img
                src={product.imageURL}
                alt={product.name}
                style={{}}
            />
            <h3>{name}</h3>
            <p>{formatPrice(price)}</p>

            <div style={{}}>
                {isAuthenticated &&
                (
                    <>
                        <button onClick={handleDecrease} disabled={quantity <=1}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrease} disabled={quantity >= stock}>+</button>
                    </>
                )}
                <button onClick={onAddToCart} disabled={!isAuthenticated}>Add</button>
                {isAdmin && <button>Edit</button>}
            </div>
        </div>
    );
}