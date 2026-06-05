import axios from 'axios';

const URL = 'http://localhost:8000';

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

export const signupUser = async (userData) => {
    try {
        return await axios.post(`${URL}/api/auth/signup`, userData);
    } catch (error) {
        console.error("API Error in signupUser:", error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        return await axios.post(`${URL}/api/auth/login`, userData);
    } catch (error) {
        console.error("API Error in loginUser:", error);
        throw error;
    }
};