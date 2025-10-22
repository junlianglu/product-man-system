import { useSelector } from 'react-redux';
import {
    selectCartStatus,
    selectCartFormattedSubtotal,
    selectCartFormattedDiscount,
    selectCartFormattedTax,
    selectCartFormattedTotal,
} from '../../features/cart/cartSelectors.js';

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
        <div>
            <div>
                <span>Subtotal</span>
                <span>{subtotal}</span>
            </div>
            <div>
                <span>Discount</span>
                <span>-{discount}</span>
            </div>
            <div>
                <span>Tax</span>
                <span>{tax}</span>
            </div>
            <div>
                <span>Total</span>
                <span>{total}</span>
            </div>
        </div>
    );
};

export default CartSummary;