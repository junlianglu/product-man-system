import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
    updateItemQuantityThunk,
    removeItemThunk,
} from '../../features/cart/cartThunks.js';
import { formatPrice } from '../../utils/formatPrice.js';

const CartItem = ({ item }) => {
    const { product, quantity } = item;
    const [inputQuantity, setInputQuantity] = useState(quantity);
    const dispatch = useDispatch();
    

    const handleInputQuantityChange = (e) => {
        if (e.target.value === '') {
            setInputQuantity('');
            return;
        }
        const newQuantity = parseInt(e.target.value);
        if (Number.isInteger(newQuantity) && newQuantity >= 1 && newQuantity <= product.stock) {
            setInputQuantity(newQuantity);
            dispatch(updateItemQuantityThunk({ productId: product._id, quantity: newQuantity }));
        }
    };
    
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
        <div>
            <div>
                <img src={product.imageURL} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{formatPrice(product.price * quantity)}</p>
                <div>
                    <button onClick={handleDecrement} disabled={inputQuantity <= 1}>-</button>
                    <input
                        type="number"
                        min='1'
                        max={product.stock}
                        step='1'
                        value={inputQuantity}
                        onChange={(e) => handleInputQuantityChange(e)}
                        required
                    />
                    <button onClick={handleIncrement} disabled={inputQuantity >= product.stock}>+</button>
                </div>
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;