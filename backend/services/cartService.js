import mongoose from 'mongoose';
import { Cart } from '../models/Cart.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';

const DISCOUNT_CODES = {
    '20 DOLLAR OFF': {
        type: 'amount',
        value: 20
    },
    '20 PERCENT OFF': {
        type: 'percentage',
        value: 0.2
    },
}

const isObjectIdValid = id => mongoose.Types.ObjectId.isValid(id);

const calculateDiscount = ({ original, discountCode }) => {
    if (!discountCode || !(discountCode in DISCOUNT_CODES)) {
        return 0;
    }
    const { type, value } = DISCOUNT_CODES[discountCode];
    if (type === 'amount') {
        return Math.min(original, value);
    } else if (type === 'percentage') {
        return original * value;
    }
    return 0;
}

const getCart = async ({ userId }) => {
    try {
        if (!isObjectIdValid(userId)) {
            throw new Error('invalid userId');
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('userId does not exist');
        }
        if (!user.cart) {
            const cart = await Cart.create({ user: user._id });
            user.cart = cart._id;
            await user.save();
        }
        const userWithCart = await user.populate('cart');
        const cart = userWithCart.cart;
        return cart;
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getCartWithSummary = async ({ userId }) => {
    try {
        let cart = await getCart({ userId });
        cart = await cart.populate('items.product');
        const subtotal = cart.items.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
        const discount = calculateDiscount({ original: subtotal, discountCode: cart.discountCode });
        const tax = (subtotal - discount) * cart.taxRate;
        const total = subtotal - discount + tax;
        return {
            cart,
            summary: {
                subtotal,
                discount,
                tax,
                total
            }
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

export const addToCart = async ({ userId, productId, quantity }) => {
    try {
        let cart = await getCart({ userId });
        cart = await cart.populate('items.product');
        if (!isObjectIdValid(productId)) {
            throw new Error('invalid productId');
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('productId does not exist');
        }
        if (!Number.isInteger(quantity)) {
            throw new Error('quantity must be an integer');
        }
        if (quantity <= 0) {
            const cartWithSummary = await getCartWithSummary({ userId });
            return cartWithSummary;
        }
        const item = cart.items.find(item => item.product._id.toString() === productId);
        if (item) {
            if (item.quantity + quantity > item.product.stock) {
                throw new Error('adding the requested quantity exceeds product stock');
            }
            item.quantity += quantity;
        } else {
            if (quantity > product.stock) {
                throw new Error('requested quantity exceeds product stock');
            }
            cart.items.push({
                product: productId,
                quantity
            });
        }
        await cart.save();
        const cartWithSummary = await getCartWithSummary({ userId });
        return cartWithSummary;
    } catch (err) {
        throw new Error(err.message);
    }
}

export const updateItemQuantity = async ({ userId, productId, quantity }) => {
    try {
        let cart = await getCart({ userId });
        cart = await cart.populate('items.product');
        if (!isObjectIdValid(productId)) {
            throw new Error('invalid productId');
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('productId does not exist');
        }
        if (!Number.isInteger(quantity)) {
            throw new Error('quantity must be an integer');
        }
        const item = cart.items.find(item => item.product._id.toString() === productId);
        if (!item) {
            throw new Error('item is not found in cart');
        }
        if (quantity > 0) {
            if (quantity > product.stock) {
                throw new Error('requested quantity exceeds product stock');
            }
            item.quantity = quantity;
        } else {
            cart.items = cart.items.filter(item => item.product._id.toString() !== productId);
        }
        await cart.save();
        const cartWithSummary = await getCartWithSummary({ userId });
        return cartWithSummary;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const applyDiscountCode = async ({ userId, discountCode }) => {
    try {
        if (!discountCode || typeof discountCode !== 'string') {
            throw new Error('discountCode must be a string');
        }
        const cart = await getCart({ userId });
        if (!(discountCode in DISCOUNT_CODES)) {
            throw new Error('discountCode is not valid');
        }
        cart.discountCode = discountCode;
        await cart.save();
        const cartWithSummary = await getCartWithSummary({ userId });
        return cartWithSummary;
    } catch (err) {
        throw new Error(err.message);
    }    
};
