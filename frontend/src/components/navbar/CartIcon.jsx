import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemsCount, selectCartFormattedTotal } from '../../features/cart/cartSelectors.js';
import { toggleCart } from '../../features/cart/cartSlice.js';
import styles from './CartIcon.module.css';

const CartIcon = () => {
    const dispatch = useDispatch();
    const itemsCount = useSelector(selectCartItemsCount);
    const total = useSelector(selectCartFormattedTotal);

    return (
        <button onClick={() => dispatch(toggleCart())} className={styles.cartButton}>
            <span className={styles.cartIcon}>🛒</span>
            {itemsCount > 0 && <span className={styles.itemCount}>{itemsCount}</span>}
            <span className={styles.total}>{total}</span>
        </button>
    );
};

export default CartIcon;