const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (path, options = {}) => {
    const url = `${BASE_URL}${path}`;
    const defaultHeaders = {
        'Content-Type': 'application/json',
    }
    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        }
    }
    const response = await fetch(path, config);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    return response.json();
};