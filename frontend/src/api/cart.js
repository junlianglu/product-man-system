import { apiRequest } from "./base";

export const fetchCartWithSummary = async ({ token }) => {
    return await apiRequest('/', { method: 'GET' }, token);
};

export const addToCart = async ({ token, productId, quantity }) => {
    return await apiRequest('/add', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
    }, token);
};

export const updateItemQuantity = async ({ token, productId, quantity }) => {
    return await apiRequest('/update', {
        method: 'PUT',
        body: JSON.stringify({ productId, quantity }),
    }, token);
};

export const applyDiscountCode = async ({ token, discountCode }) => {
    return await apiRequest('/discount', {
        method: 'POST',
        body: JSON.stringify({ discountCode }),
    }, token);
};