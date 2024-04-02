import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./lib/prisma";
import getUserProfile from "./hooks/getUserProfile";

export async function middleware(request: NextRequest) {
    if(request.nextUrl.pathname === '/register' && request.cookies.get('token') === undefined){
        return NextResponse.next();
    }
    if(request.nextUrl.pathname === '/dashboard'){
        return NextResponse.rewrite(new URL('/', request.nextUrl))
    }
    if(request.cookies.get('token') !== undefined) {
        console.log(request.cookies.get('token'))
        return NextResponse.rewrite(new URL('/', request.nextUrl));
    } else {
        return NextResponse.rewrite(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/register',
        '/login',
        '/',
        '/dashboard',
    ]
}