import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../features/cart/cartSelectors";

export default function ProductActions({
    product,
    isAdmin,
    isAuthenticated,
    onAddToCart,
    onUpdateQuantity,
    onEdit,
    }) {
    const { _id, stock } = product;
    const cartItems = useSelector(selectCartItems);
    const existingCartItem = cartItems.find((item) => item.product._id === _id);
    const [quantity, setQuantity] = useState(existingCartItem ? existingCartItem.quantity : 0);
    const [isLocalChange, setIsLocalChange] = useState(false);// avoid quantity shwing problem "wait"

    useEffect(() => {
        if (!isLocalChange) {
            if (existingCartItem) {
                setQuantity(existingCartItem.quantity);
            } else {
                setQuantity(0);
            }
        }
    }, [existingCartItem]);

    const handleDecrease = () => {
        if (quantity > 0) {
        const newQuantity = quantity - 1;
        setIsLocalChange(true);
        setQuantity(newQuantity);
        onUpdateQuantity(_id, newQuantity).finally(() => setIsLocalChange(false));;
        }
    };

    const handleIncrease = () => {
        if (quantity < stock) {
        const newQuantity = quantity + 1;
        setIsLocalChange(true);
        setQuantity(newQuantity);
        onUpdateQuantity(_id, newQuantity).finally(() => setIsLocalChange(false));;
        }
    };

    const handleAdd = () => {
        const newQuantity = quantity > 0 ? quantity + 1 : 1;
        setQuantity(newQuantity);
        onAddToCart(_id);
    };

    return (
        <div style={{ marginTop: "8px" }} onClick={(e) => e.stopPropagation()}>
        {isAuthenticated && quantity > 0 ? (
            <>
            <button onClick={handleDecrease}>-</button>
            <span style={{ margin: "0 8px" }}>{quantity}</span>
            <button onClick={handleIncrease} disabled={quantity >= stock}>
                +
            </button>
            </>
        ) : (
            isAuthenticated && <button onClick={handleAdd}>Add</button>
        )}

        {isAdmin && (
            <button style={{ marginLeft: "10px" }} onClick={onEdit}>
            Edit
            </button>
        )}
        </div>
    );
    }
