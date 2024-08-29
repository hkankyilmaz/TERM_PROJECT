"use server";
import axios from "axios";
import { cookies } from "next/headers";


const AUTH_SERVICE_REGISTER = "https://authservice-u5r5vyqfka-ew.a.run.app//auth/register";
const AUTH_SERVICE_LOGIN = "https://authservice-u5r5vyqfka-ew.a.run.app/auth/login";


export const login = async (formData) => {

    const c = cookies()

    const authResponse = await axios.post(
        AUTH_SERVICE_LOGIN,
        {
            username: formData.username,
            password: formData.password,
        }
    );

    console.log("authResponse", authResponse);

    c.set('token_hemenal', authResponse.data.token)
    c.set('ref_token_hemenal', authResponse.data.refreshToken)
    c.set('user_name_hemenal', authResponse.data.name)
    c.set('user_username_hemenal', authResponse.data.username)
    c.set('user_email_hemenal', authResponse.data.email)
    c.set('user_role_hemenal', authResponse.data.role)


    return authResponse.data;
};


export const authRegister = async (formData) => {
    const response = await axios.post(
        AUTH_SERVICE_REGISTER,
        {
            name: formData.name,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            authorities: ["ROLE_USER"],
        }
    );
    return response.data;
}





