"use server";
import axios from "axios";
import { cookies } from "next/headers";


const CUSTOMER_SERVICE_REGISTER = "https://customerservice-u5r5vyqfka-uc.a.run.app/customers";
const CUSTOMER_SERVICE_GET_CUSTOMER = "https://customerservice-u5r5vyqfka-uc.a.run.app/customers/email/";
const CUSTOMER_SERVICE_GET_CUSTOMER_ID = "https://customerservice-u5r5vyqfka-uc.a.run.app/customers/";




export const customerRegister = async (formData) => {
    const c = cookies()
    const response = await axios.post(
        CUSTOMER_SERVICE_REGISTER,
        {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            address: formData.address,
        }
    );
    c.set('id_customer_hemenal', response.data.id)
    return response.data;


}

export const getCustomerViaEmail = async (email) => {
    const response = await axios.get(
        CUSTOMER_SERVICE_GET_CUSTOMER + email
    );
    return response.data;
}

export const getCustomerViaId = async (id) => {
    const response = await axios.post(
        CUSTOMER_SERVICE_GET_CUSTOMER_ID + id,
        {
            id: formData.id,
        }
    );
    return response.data;
}




