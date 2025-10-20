import React from "react";
import {formatPrice} from "../../utils/formatPrice";

export default function ProductCard({product, onClick}){
    return (
        <div
            className = "product-card"
            style={{

            }}
            onClick={onClick}
        >
            <img
                src={product.imageURL}
                alt={product.name}
                style={{}}
            />
            <h3>{product.name}</h3>
            <p>{formatPrice(product.price)}</p>
        </div>
    );
}