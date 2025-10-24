import {apiRequest} from "./base";

export const getAllProducts = (page = 1, limit = 10, token, sort = "default", search = "") => {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    return apiRequest(`/products?page=${page}&limit=${limit}&sort=${sort}${searchParam}`, {method: "GET"}, token);
};

export const getProductById = (productId, token) => {
    return apiRequest(`/products/${productId}`,{method: "GET"}, token);
};

export const createProduct = (productData, token) => {
    return apiRequest(
        "/products/",
        {
            method: "POST",
            body: JSON.stringify(productData),
        },
        token
    );
};

export const updateProductById = (productId, productData, token) => {
    return apiRequest(
        `/products/${productId}`,
        {
            method: "PUT",
            body: JSON.stringify(productData),
        },
        token
    );
};

export const deleteProductById = (productId, token) => {
    return apiRequest(`/products/${productId}`, {method: "DELETE"}, token);
};