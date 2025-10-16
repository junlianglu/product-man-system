import { getCartWithSummary, addToCart, updateItemQuantity, applyDiscountCode } from '../services/cartService.js';

export const getCartWithSummaryController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cart, summary } = await getCartWithSummary({ userId });
        res.status(200).json({ cart, summary });
    } catch (err) {
        if (err.message === 'invalid userId'
            || err.message === 'discountCode is not valid'
        ) {
            res.status(400).json({ error: err.message });
        } else if (err.message === 'userId does not exist'
            || err.message === 'productId does not exist'
        ) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Server error'});
        }
    }
};

export const addToCartController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const { cart, summary } = await addToCart({ userId, productId, quantity });
        res.status(200).json({ cart, summary });
    } catch (err) {
        if (err.message === 'invalid userId'
            || err.message === 'discountCode is not valid'
            || err.message === 'invalid productId'
            || err.message === 'quantity must be an integer'
            || err.message === 'requested quantity exceeds product stock'
            || err.message === 'adding the requested quantity exceeds product stock'
        ) {
            res.status(400).json({ error: err.message });
        } else if (err.message === 'item is not found in cart'
            || err.message === 'userId does not exist'
            || err.message === 'productId does not exist'
        ) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Server error'});
        }
    }
};

export const updateItemQuantityController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        const { cart, summary } = await updateItemQuantity({ userId, productId, quantity });
        res.status(200).json({ cart, summary });
    } catch (err) {
        if (err.message === 'invalid userId'
            || err.message === 'discountCode is not valid'
            || err.message === 'invalid productId'
            || err.message === 'quantity must be an integer'
            || err.message === 'requested quantity exceeds product stock'
        ) {
            res.status(400).json({ error: err.message });
        } else if (err.message === 'item is not found in cart'
            || err.message === 'userId does not exist'
            || err.message === 'productId does not exist'
        ) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Server error'});
        }
    }
};

export const applyDiscountCodeController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { discountCode } = req.body;
        const { cart, summary } = await applyDiscountCode({ userId, discountCode});
        res.status(200).json({ cart, summary });
    } catch (err) {
        if (err.message === 'invalid userId'
            || err.message === 'discountCode must be a string'
            || err.message === 'discountCode is not valid'  
        ) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Server error'});
        }
    }
};
