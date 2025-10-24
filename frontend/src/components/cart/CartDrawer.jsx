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
    selectCartError,
    selectCartIsOpen
} from "../../features/cart/cartSelectors.js";
import { selectAuthIsAuthenticated } from "../../features/auth/authSelectors.js";
import styles from './CartDrawer.module.css';
import { IoClose } from 'react-icons/io5';


const CartDrawer = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);
    const isCartOpen = useSelector(selectCartIsOpen);
    const items = useSelector(selectCartItems);
    const itemsCount = useSelector(selectCartItemsCount);
    const status = useSelector(selectCartStatus);
    const error = useSelector(selectCartError);

    const [inputDiscountCode, setInputDiscountCode] = useState('');
    const [submittedDiscountCode, setSubmittedDiscountCode] = useState('');
    const [localError, setLocalError] = useState('');

    if (!isAuthenticated || !isCartOpen) {
        return null;
    }

    const handleClose = () => {
        dispatch(closeCart());
    };

    const handleOverlayClick = () => {
        dispatch(closeCart());
    };

    const handleDrawerClick = (e) => {
        e.stopPropagation();
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
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.drawer} onClick={handleDrawerClick}>
                <div className={styles.drawerHeader}>
                    <h2>Cart ({itemsCount})</h2>
                    <button onClick={handleClose}><IoClose /></button>
                </div>
                {status === 'loading' ? <p>Loading Cart...</p>
                    : items.length === 0 ? (
                        <div className={styles.emptyCartMessage}>
                            🛒 Your cart is empty.
                        </div>
                    )
                    : (
                        <>  
                            <div>
                                {items.map(item => <CartItem key={item.product._id} item={item} />)}
                            </div>
                            <div className={styles.discountSection}>
                                <label>Apply Discount Code</label>
                                <input
                                    type="text"
                                    placeholder="20 DOLLAR OFF"
                                    value={inputDiscountCode}
                                    onChange={(e) => setInputDiscountCode(e.target.value)}
                                />
                                {localError && <p className={styles.errorText}>{localError}</p>}
                                {error && submittedDiscountCode 
                                    && (<p className={styles.errorText}>
                                            Discount code "{submittedDiscountCode}" is invalid.
                                        </p>)
                                }
                                <button onClick={handleApplyDiscountCode}>Apply</button>
                            </div>
                            <CartSummary />
                            {error && (<p className={styles.errorText}>
                                            {error.message || error.error || error.err}
                                        </p>)
                            }
                            <button className={styles.checkoutButton}>Continue to checkout</button>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default CartDrawer;