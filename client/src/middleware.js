import { NextRequest, NextResponse } from "next/server";


export function middleware(request) {

    const allCookies = request.cookies.getAll()

    const isAuth = request.cookies.has("token_hemenal")

    console.log(allCookies)

    const urls = ["/card", "/profile"]



    if (urls.includes(request.nextUrl.pathname) && !isAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}