import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
    updateItemQuantityThunk,
    removeItemThunk,
} from '../../features/cart/cartThunks.js';
import { formatPrice } from '../../utils/formatPrice.js';
import styles from './CartDrawer.module.css';

const CartItem = ({ item }) => {
    const { product, quantity } = item;
    const [inputQuantity, setInputQuantity] = useState(quantity);
    const dispatch = useDispatch();
    
    const handleIncrement = () => {
        setInputQuantity(prev => {
            const newQuantity = prev + 1;
            if (newQuantity <= product.stock) {
                dispatch(updateItemQuantityThunk({ productId: product._id, quantity: newQuantity }));
                return newQuantity;
            }
            return prev;
        });
    };

    const handleDecrement = () => {
        setInputQuantity(prev => {
            const newQuantity = prev - 1;
            if (newQuantity >= 1) {
                dispatch(updateItemQuantityThunk({ productId: product._id, quantity: newQuantity }));
                return newQuantity;
            }
            return prev;
        });
    };

    const handleRemove = () => {
        dispatch(removeItemThunk({ productId: product._id }));
    };

    return (
        <div className={styles.cartItem}>
            <img src={product.imageURL} alt={product.name} />
            <div style={{ flexGrow: 1 }}>
                <h4>{product.name}</h4>
                <p>{formatPrice(product.price * quantity)}</p>
                <div className={styles.quantityControls}>
                    <button onClick={handleDecrement} disabled={inputQuantity <= 1}>-</button>
                    <input
                        type="number"
                        value={inputQuantity}
                        readOnly
                    />
                    <button onClick={handleIncrement} disabled={inputQuantity >= product.stock}>+</button>
                </div>
            </div>
            <button className={styles.removeButton} onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default CartItem;