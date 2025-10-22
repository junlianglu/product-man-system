import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem.jsx";
import CartSummary from "./CartSummary.jsx";
import { closeCart } from "../../features/cart/cartSlice.js";
import { applyDiscountCodeThunk } from "../../features/cart/cartThunks.js";
import {
    selectCartItems,
    selectCartItemsCount,
    selectCartStatus,
    selectCartError
} from "../../features/cart/cartSelectors.js";

const CartDrawer = () => {
    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const itemsCount = useSelector(selectCartItemsCount);
    const status = useSelector(selectCartStatus);
    const error = useSelector(selectCartError);

    const [inputDiscountCode, setInputDiscountCode] = useState('');
    const [submittedDiscountCode, setSubmittedDiscountCode] = useState('');
    const [localError, setLocalError] = useState('');

    const handleClose = () => {
        dispatch(closeCart());
    };

    const handleApplyDiscountCode = () => {
        const trimmed = inputDiscountCode.trim();
        if (!trimmed) {
            setLocalError('Please enter a discount code.');
            return;
        }
        setLocalError('');
        setSubmittedDiscountCode(trimmed);
        setInputDiscountCode('');
        dispatch(applyDiscountCodeThunk({ discountCode: trimmed }));
    };

    return (
        <div>
            {status === 'loading' ? <p>Loading Cart...</p>
                : items.length === 0 ? <p>Your cart is empty.</p>
                : (
                    <>
                        <div>
                            <h2>Cart ({itemsCount})</h2>
                            <button onClick={handleClose}>x</button>
                        </div>
                        <div>
                            {items.map(item => <CartItem key={item.product._id} item={item} />)}
                        </div>
                        <div>
                            <label>Apply Discount Code</label>
                            <input
                                type="text"
                                placeholder="20 DOLLAR OFF"
                                value={inputDiscountCode}
                                onChange={(e) => setInputDiscountCode(e.target.value)}
                            />
                            {localError && <p style={{ color: 'red' }}>{localError}</p>}
                            {error && submittedDiscountCode 
                                && (<p style={{ color: 'red' }}>
                                        Discount code "{submittedDiscountCode}" is invalid.
                                    </p>)
                            }
                            <button onClick={handleApplyDiscountCode}>Apply</button>
                        </div>
                        <CartSummary />
                        <button>Continue to checkout</button>
                    </>
                )
            }
        </div>
    );
};

export default CartDrawer;