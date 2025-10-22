import { apiRequest } from "./base";

export const fetchCartWithSummary = async ({ token }) => {
    return await apiRequest('/cart/', { method: 'GET' }, token);
};

export const addToCart = async ({ token, productId, quantity }) => {
    return await apiRequest('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
    }, token);
};

export const updateItemQuantity = async ({ token, productId, quantity }) => {
    return await apiRequest('/cart/update', {
        method: 'PUT',
        body: JSON.stringify({ productId, quantity }),
    }, token);
};

export const applyDiscountCode = async ({ token, discountCode }) => {
    return await apiRequest('/cart/discount', {
        method: 'POST',
        body: JSON.stringify({ discountCode }),
    }, token);
};