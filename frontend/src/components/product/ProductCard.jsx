import React from "react";
import {formatPrice} from "../../utils/formatPrice";
import {useNavigate} from "react-router-dom";
import ProductActions from "./ProductActions";


export default function ProductCard({
    product,
    isAdmin,
    isAuthenticated,
    onAddToCart,
    onUpdateQuantity,
}){
    const {name, price, imageURL, stock} = product;
    const navigate = useNavigate();


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

            <ProductActions
                product={product}
                isAdmin={isAdmin}
                isAuthenticated={isAuthenticated}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                onEdit={handleEdit}
            />
        </div>
    );
}