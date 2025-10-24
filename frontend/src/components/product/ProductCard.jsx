import React from "react";
import {formatPrice} from "../../utils/formatPrice";
import {useNavigate} from "react-router-dom";
import ProductActions from "./ProductActions";
import styles from "./styles/ProductCard.module.css";


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
            className={styles.card}
            onClick={handleCardClick}
        >
            <img
                src={imageURL}
                alt={name}
                className={styles.image}
            />
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.price}>{formatPrice(price)}</p>
            <p>
            {product.stock > 0 ? (
                <>Stock: {product.stock}</>
            ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
            )}
            </p>


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