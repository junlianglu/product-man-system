import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemsCount, selectCartFormattedTotal } from '../../features/cart/cartSelectors.js';
import { toggleCart } from '../../features/cart/cartSlice.js';

const CartIcon = () => {
    const dispatch = useDispatch();
    const itemsCount = useSelector(selectCartItemsCount);
    const total = useSelector(selectCartFormattedTotal);

    return (
        <button onClick={() => dispatch(toggleCart())}>
            <span>🛒</span>
            {itemsCount > 0 && <span>{itemsCount}</span>}
            <span>{total}</span>
        </button>
    );
};

export default CartIcon;