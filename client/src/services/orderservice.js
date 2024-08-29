"use server";
import axios from "axios";


const ORDERS = "https://orderservice-u5r5vyqfka-ew.a.run.app/orders";


const getOrders = async () => {
    try {
        const response = await axios.get(ORDERS);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

const createOrder = async (data) => {
    try {
        const response = await axios.post(ORDERS, data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}






export { getOrders, createOrder };