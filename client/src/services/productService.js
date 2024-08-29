"use server";
import axios from "axios";

// API Endpoints
const CREATE_PRODUCT = "https://productservice-u5r5vyqfka-ew.a.run.app/product/create";
const GET_PRODUCTS = "https://productservice-u5r5vyqfka-ew.a.run.app/product/products";
const DELETE_PRODUCT = "https://productservice-u5r5vyqfka-ew.a.run.app/product/delete";
const UPDATE_PRODUCT = "https://productservice-u5r5vyqfka-ew.a.run.app/product/update";

// Create Product
export const createProduct = async (data) => {
    try {
        const response = await axios.post(CREATE_PRODUCT, data);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

// Get Products
export const getProducts = async () => {
    try {
        const response = await axios.get(GET_PRODUCTS);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

// Delete Product
export const deleteProduct = async (data) => {
    try {
        const response = await axios.post(DELETE_PRODUCT, data);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}

// Update Product
export const updateProduct = async (data) => {
    try {
        const response = await axios.post(UPDATE_PRODUCT, data);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}