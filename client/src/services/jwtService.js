"use server"
import { cookies } from "next/headers";
const c = cookies()

export const removeTokens = () => {

    return new Promise((resolve, reject) => {

        c.delete('token_hemenal')
        c.delete('ref_token_hemenal')
        c.delete('user_name_hemenal')
        c.delete('user_username_hemenal')
        c.delete('user_email_hemenal')
        c.delete('user_role_hemenal')
        resolve()

    })
}

export const getTokens = () => {
    const c = cookies()
    return {
        token: c.get('token_hemenal'),
        refToken: c.get('ref_token_hemenal'),
        name: c.get('user_name_hemenal'),
        username: c.get('user_username_hemenal'),
        email: c.get('user_email_hemenal'),
        role: c.get('user_role_hemenal')

    }
}

export const setTokens = (token, refToken, name, username, email, role) => {
    const c = cookies()
    c.set('token_hemenal', token)
    c.set('ref_token_hemenal', refToken)
    c.set('user_name_hemenal', name)
    c.set('user_username_hemenal', username)
    c.set('user_email_hemenal', email)
    c.set('user_role_hemenal', "ROLE_USER")
}