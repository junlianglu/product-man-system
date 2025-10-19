import {apiRequest} from "./base";

export const getAllProducts = () => {
    return apiRequest("/products" , {method: "GET"});
};

export const getProductById = (productId) => {
    return apiRequest(`/products/${productId}`,{method: "GET"});
};

export const createProduct = (productData, token) => {
    return apiRequest(
        "/products",
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