import { useSelector } from 'react-redux';
import {
    selectCartStatus,
    selectCartFormattedSubtotal,
    selectCartFormattedDiscount,
    selectCartFormattedTax,
    selectCartFormattedTotal,
} from '../../features/cart/cartSelectors.js';
import styles from './CartDrawer.module.css';

const CartSummary = () => {
    const status = useSelector(selectCartStatus);
    const subtotal = useSelector(selectCartFormattedSubtotal);
    const discount = useSelector(selectCartFormattedDiscount);
    const tax = useSelector(selectCartFormattedTax);
    const total = useSelector(selectCartFormattedTotal);

    if (status === 'loading') {
        return <p>Loading summary...</p>;
    } else if (status === 'failed') {
        return <p>Failed to load cart summary.</p>
    }

    return (
        <div className={styles.summary}>
            <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{subtotal}</span>
            </div>
            <div className={styles.summaryRow}>
                <span>Discount</span>
                <span>-{discount}</span>
            </div>
            <div className={styles.summaryRow}>
                <span>Tax</span>
                <span>{tax}</span>
            </div>
            <div className={styles.summaryRow}>
                <span>Total</span>
                <span>{total}</span>
            </div>
        </div>
    );
};

export default CartSummary;