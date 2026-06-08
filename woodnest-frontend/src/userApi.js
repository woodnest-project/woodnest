import axios from 'axios';

const URL = 'http://localhost:8000';

// --- INVENTORY APIS ---
export const addFurniture = async (data) => {
    try {
        return await axios.post(`${URL}/add`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.error("API Error in addFurniture:", error);
        throw error;
    }
};

export const getAllFurniture = async () => {
    try {
        return await axios.get(`${URL}/all`);
    } catch (error) {
        console.error("API Error in getAllFurniture:", error);
        throw error;
    }
};

export const deleteFurniture = async (data) => {
    try {
        return await axios.post(`${URL}/delete`, data);
    } catch (error) {
        console.error("API Error in deleteFurniture:", error);
        throw error;
    }
};

// --- AUTHENTICATION APIS ---
export const registerUser = async (data) => {
    try {
        return await axios.post(`${URL}/api/auth/register`, data);
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

// Alias to prevent any import errors in signup.jsx
export const signupUser = registerUser;

export const loginUser = async (data) => {
    try {
        return await axios.post(`${URL}/api/auth/login`, data);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// --- CHECKOUT & ORDER LOG APIS ---
export const createOrder = async (orderData) => {
    try {
        return await axios.post(`${URL}/orders/create`, orderData);
    } catch (error) {
        console.error("Order creation failed:", error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        return await axios.get(`${URL}/orders`);
    } catch (error) {
        console.error("Failed to load orders:", error);
        throw error;
    }
};