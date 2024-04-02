'use server';

import { prisma } from "@/lib/prisma";

export default async function verifyUser(email: string){
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    console.log(user?.active);
    if(!user) return false;
    if(!user.active) return false;
    return true;
}