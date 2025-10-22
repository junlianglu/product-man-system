import { apiRequest } from "./base";

export const loginUser = async ({ email, password }) => {
    return await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};

export const signupUser = async ({ email, password, isAdmin }) => {
    return await apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, isAdmin }),
    });
};

export const resetPassword = async ({ email }) => {
    return await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
};