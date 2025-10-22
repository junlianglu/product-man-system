const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (path, options = {}, token = null) => {
    const url = `${BASE_URL}${path}`;
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        }
    }
    const response = await fetch(url, config);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.msg || error.message);
    }
    return response.json();
};
