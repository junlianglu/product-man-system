import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../features/cart/cartSelectors";
import styles from "./styles/ProductActions.module.css";

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
        if (!existingCartItem && quantity > 0) {
            setQuantity(0);
            setIsLocalChange(false);
        }
        if (!isLocalChange) {
            if (existingCartItem) {
                setQuantity(existingCartItem.quantity);
            } else {
                setQuantity(0);
            }
        }
    }, [existingCartItem, isLocalChange]);

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
        <div className={styles.actionsContainer} onClick={(e) => e.stopPropagation()}>
        {isAuthenticated && quantity > 0 ? (
            <>
            <button className={styles.button} onClick={handleDecrease}>-</button>
            <span className={styles.quantity}>{quantity}</span>
            <button className={styles.button} onClick={handleIncrease} disabled={quantity >= stock}>
                +
            </button>
            </>
        ) : (
            isAuthenticated && <button className={styles.button} onClick={handleAdd}>Add</button>
        )}

        {isAdmin && (
            <button className={`${styles.button} ${styles.editButton}`} onClick={onEdit}>
            Edit
            </button>
        )}
        </div>
    );
    }
